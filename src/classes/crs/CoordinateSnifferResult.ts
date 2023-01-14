import { Geometry, LineString, Point, Polygon } from 'ol/geom'
import CoordinateSystemTransformation from './CoordinateSystemTransformation'
import GeometryHelpers from './static/helpers/GeometryHelpers'

export default class CrsSnifferResult {
  private transformation: CoordinateSystemTransformation
  public readonly referencePoint: Point | undefined
  public readonly referencePolygon: Polygon | undefined
  public readonly unknownGeometry: Geometry
  public uniqueId: number
  public readonly distance: number | undefined
  public readonly isWithinBounds: boolean | undefined

  constructor(id: number, transformation: CoordinateSystemTransformation, referencePoint: Point | undefined, referencePolygon: Polygon | undefined, unknownGeometry: Geometry) {
    this.uniqueId = id
    this.transformation = transformation
    this.referencePoint = referencePoint
    this.referencePolygon = referencePolygon
    this.unknownGeometry = unknownGeometry
    if (referencePoint) {
      this.distance = new LineString([referencePoint.getCoordinates(), unknownGeometry.getClosestPoint(referencePoint.getCoordinates())]).getLength()
    }

    if (this.transformation.coordinateSystem.boundingBox) {
      this.isWithinBounds = GeometryHelpers.polygonTouchGeometry(this.transformation.coordinateSystem.boundingBox, this.unknownGeometry)
    }
  }

  public get resultLine(): LineString | undefined {
    if (this.referencePoint && this.unknownGeometry) {
      const line = new LineString([this.referencePoint.getCoordinates(), this.unknownGeometry.getClosestPoint(this.referencePoint.getCoordinates())])
      return line
    }

    return undefined
  }

  public get crsName(): string {
    return this.transformation.coordinateSystem.name
  }

  public get crsCode(): string {
    return this.transformation.coordinateSystem.epsgCode ?? ''
  }

  public get crsArea(): string {
    return this.transformation.coordinateSystem.area
  }

  public get boundingBox(): Polygon | undefined {
    return this.transformation.coordinateSystem.boundingBox
  }

  public get boundingBoxArea(): number {
    return this.transformation.coordinateSystem.boundingBoxArea ?? Number.MAX_VALUE
  }
}