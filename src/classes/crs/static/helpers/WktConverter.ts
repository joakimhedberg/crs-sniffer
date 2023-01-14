import DxfParser from 'dxf-parser'
import * as shapefile from 'shapefile'
import { GeoJSON, Geometry, Point as GeoJsonPoint, LineString } from 'geojson'

export default class WktConverter {
  public static convertFileToWkt = async(file: File): Promise<string | undefined> => {
    const fileData = await WktConverter.getFileStringData(file)
    if (!fileData) {
      return undefined
    }
    if (file.name.endsWith('.shp')) {
      return WktConverter.getShapefileWkt(await file.arrayBuffer())
    }
    else if (file.name.endsWith('.json')) {
      return WktConverter.getGeoJsonWkt(fileData)
    }
    else if (file.name.endsWith('.dxf')) {
      return WktConverter.getDxfWkt(fileData)
    }
  }

  private static getFileStringData = async (file: File): Promise<string | undefined> => {
    const buffer = await file.arrayBuffer()
    const decoder = new TextDecoder()
    return decoder.decode(buffer)
  }

  private static getDxfWkt = async (file_data: string): Promise<string | undefined> => {  
    const parser = new DxfParser()
    const dxf = await parser.parse(file_data)
    if (dxf) {
      const entity = dxf.entities[0]
      if (entity) {
        if ('vertices' in entity && Array.isArray(entity.vertices)) {
          if (entity.type === 'LINE' || entity.type === 'LWPOLYLINE' || entity.type === 'POLYLINE') {
            const vert = entity.vertices
            const res: LineString = {
              type: 'LineString',
              coordinates: vert.map(v => [v.x, v.y])
            }
            const { stringify } = require('wkt')
            return stringify(res)
          }
          else {
            const vert = entity.vertices[0]
            if ('x' in vert && 'y' in vert) {
              const pt: GeoJsonPoint = {
                type: 'Point',
                coordinates: [vert.x, vert.y]
              }

              const { stringify } = require('wkt')
              return stringify(pt)
            }
          }
        }
      }
    }
    return undefined
  }

  private static getShapefileWkt = async(file_data: ArrayBuffer): Promise<string | undefined> => {
    const shape_data = await shapefile.openShp(file_data)
    let item_read = await shape_data.read()
    
    while (!item_read.done) {
      if (item_read.value) {
        const {stringify} = require('wkt')
        return stringify(item_read.value)
      }
      item_read = await shape_data.read()
    }
    
    return undefined
  }

  private static getGeoJsonWkt = async(geojson_data: string): Promise<string | undefined> => {
    const json_file = JSON.parse(geojson_data) as GeoJSON
    if (json_file) {
      let geometry: Geometry | undefined = undefined

      if (json_file.type === 'FeatureCollection') {
        const feat = json_file.features[0]
        if (feat && feat.geometry) {
          geometry = feat.geometry
        }
      }
      else if (json_file.type === 'GeometryCollection') {
        geometry = json_file.geometries[0]
      }
      else if (json_file.type === 'Feature') {
        geometry = json_file.geometry
      }
      else {
        geometry = json_file
      }

      if (geometry) {
        const { stringify } = require('wkt')
        return stringify(geometry)
      }

      return undefined
    }
  }
}