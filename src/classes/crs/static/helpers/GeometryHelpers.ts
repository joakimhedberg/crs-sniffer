import WKT from 'ol/format/WKT'
import { Polygon } from 'geojson'
import GeoJSON from 'ol/format/GeoJSON'
import OlPolygon from 'ol/geom/Polygon'
import OlPoint from 'ol/geom/Point'
import OlGeometry from 'ol/geom/Geometry'
import OlLineString from 'ol/geom/LineString';

import proj4 from 'proj4'
import { MultiPolygon, MultiLineString, MultiPoint } from 'ol/geom'
import Geometry from 'ol/geom/Geometry'

export default class GeometryHelpers {
  public static boundingBoxToGeoJson = (bbox: number[] | null) => {
    if (!bbox) {
      return undefined
    }
    
    const coordinates = GeometryHelpers.bboxToEpsg3857(GeometryHelpers.bboxToCoordinates(bbox))
    if (!coordinates) {
      return undefined
    }

    const positions = coordinates.map(crd => [crd[0], crd[1]])
    positions.push(coordinates[0])
    const result: Polygon = {
      type: 'Polygon',
      coordinates: [positions]
    }

    return result
  }

  public static boundingBoxToOpenlayers(bbox: number[] | null): OlPolygon | undefined {
    const geoJson = GeometryHelpers.boundingBoxToGeoJson(bbox)
    if (geoJson) {
      return new GeoJSON().readGeometry(geoJson) as OlPolygon
    }

    return undefined
  }

  private static bboxToCoordinates = (bbox: number[]) => {
    const x1 = bbox[0]
    const y1 = bbox[1]
    const x2 = bbox[2]
    const y2 = bbox[3]

    const coord1 = [y1, x1]
    const coord2 = [y2, x1]
    const coord3 = [y2, x2]
    const coord4 = [y1, x2]

    return [coord1, coord2, coord3, coord4, coord1]
  }

  private static bboxToEpsg3857 = (bbox: number[][]) => {
    const trans = proj4('EPSG:4326', 'EPSG:3857')
    for (let i = 0; i < bbox.length; i++) {
      bbox[i] = trans.forward(bbox[i])
    }
    return bbox
  }

  public static polygonContains(polygon: OlPolygon, point: OlPoint) {
    const coordinates = point.getCoordinates()
    return polygon.containsXY(coordinates[0], coordinates[1])
  }

  public static polygonTouchGeometry(polygon: OlPolygon, geometry: OlGeometry) {
    if (geometry instanceof OlPolygon) {
      return GeometryHelpers.polygonsTouch(polygon, geometry)
    }
    else if (geometry instanceof OlPoint) {
      return GeometryHelpers.polygonContains(polygon, geometry)
    } else if (geometry instanceof OlLineString) {

    }
  }

  public static polygonTouchLineString(polygon: OlPolygon, linestring: OlLineString) {
    const overlap = require('polygon-overlap')
    for (const part1 of polygon.getCoordinates()) {
      if (overlap(part1, linestring.getCoordinates())) {
        return true
      }
    }
    return false
  }

  public static polygonsTouch(polygon1: OlPolygon, polygon2: OlPolygon) {
    const overlap = require('polygon-overlap')
    for (const part1 of polygon1.getCoordinates()) {
      for (const part2 of polygon2.getCoordinates()) {
        if (overlap(part1, part2)) {
          return true
        }
      }
    }
    return false
  }

  public static wktToSimpleGeometry(wktString: string): Geometry | undefined {
    try {
      const wkt = new WKT()
        let geom = wkt.readGeometry(wktString)
        if (geom instanceof MultiPolygon) {
          geom = geom.getPolygon(0)
        }
        if (geom instanceof MultiLineString) {
          geom = geom.getLineString(0)
        }
        if (geom instanceof MultiPoint) {
          geom = geom.getPoint(0)
        }
        return geom
    }
    catch {
      return undefined
    }
  }
}