import proj4, { Converter } from 'proj4'
import CoordinateSystem from './CoordinateSystem'
import { Position } from 'geojson'
import { Geometry, LineString, Point, Polygon } from 'ol/geom'
import { Coordinate } from 'ol/coordinate'

class DummyConverter implements Converter {
  forward<T extends proj4.TemplateCoordinates>(coordinates: T): T {
    return coordinates
  }
  inverse<T extends proj4.TemplateCoordinates>(coordinates: T): T {
    return coordinates
  }

}

export default class CoordinateSystemTransformation {
  private crs: CoordinateSystem
  public converter: Converter

  constructor(coordinateSystem: CoordinateSystem) {
    this.crs = coordinateSystem
    if (coordinateSystem.epsgCode === 'EPSG:3857') {
      this.converter = new DummyConverter()
    }
    else {
      this.converter = proj4('EPSG:3857', coordinateSystem.epsgCode)
    }
  }

  public get coordinateSystem(): CoordinateSystem {
    return this.crs
  }

  private transformPoint(point: Point, transformation: (coordinate: Position) => Position): Point {
    const newPoint = point.clone()
    const coords = newPoint.getCoordinates()
    const new_coords = transformation(coords)
    if (new_coords) {
      newPoint.setCoordinates(new_coords)
    }
    return newPoint
  }

  private transformPolygon(polygon: Polygon, transformation: (coordinate: Position) => Position): Polygon {
    const newCoords: Coordinate[][] = []
    const newPolygon = polygon.clone()

    for (const part of newPolygon.getCoordinates()) {
      const current_part: Coordinate[] = []
      for (const coord of part) {
        const new_coord = transformation(coord)
        if (new_coord) {
          current_part.push(new_coord)
        }
      }
      newCoords.push(current_part)
    }

    newPolygon.setCoordinates(newCoords)
    return newPolygon
  }

  private transformLineString(linestring: LineString, transformation: (coordinate: Position) => Position): LineString {
    const newCoords: Coordinate[] = []
    const newLineString = linestring.clone()
    
    for (const coord of newLineString.getCoordinates()) {
      const new_coord = transformation(coord)
      newCoords.push(new_coord)
    }

    newLineString.setCoordinates(newCoords)
    return newLineString
  }

  private transformGeometry(geometry: Geometry, transformation: (coordinate: Position) => Position): Geometry {
    if (geometry instanceof Polygon) {
      return this.transformPolygon(geometry as Polygon, transformation)
    } else if (geometry instanceof Point) {
      return this.transformPoint(geometry as Point, transformation)
    } else if (geometry instanceof LineString) {
      return this.transformLineString(geometry as LineString, transformation)
    }

    return geometry
  }

  public transformGeometryBackward(geometry: Geometry): Geometry {
    return this.transformGeometry(geometry, this.converter.inverse)
  }

  public transformGeometryForward(geometry: Geometry): Geometry {
    return this.transformGeometry(geometry, this.converter.forward)
  }

  public transformForward(coordinate: Position): Position | undefined {
    try {
      return this.converter.forward(coordinate)
    } catch {
      return undefined
    }
  }

  public transformBackward(coordinate: Position): Position | undefined {
    try {
      return this.converter.inverse(coordinate)
    } catch {
      return undefined
    }
  }
}