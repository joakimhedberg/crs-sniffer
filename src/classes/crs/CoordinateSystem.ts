import { Polygon } from 'ol/geom'
import proj4 from 'proj4'
import IEPSGCoordinateSystem from '../../interfaces/crs/IEPSGCoordinateSystem'
import GeometryHelpers from './static/helpers/GeometryHelpers'


export default class CoordinateSystem {
  private crs: IEPSGCoordinateSystem
  public readonly isRegistered: boolean
  public boundingBox: Polygon | undefined

  constructor(crs: IEPSGCoordinateSystem) {
    this.crs = crs
    const stringCode = this.epsgCode

    if (stringCode && this.crs.proj4) {
      proj4.defs(stringCode, this.crs.proj4)
      this.isRegistered = true
    }
    else {
      this.isRegistered = false
    }

    if (crs.bbox) {
      this.boundingBox = GeometryHelpers.boundingBoxToOpenlayers(crs.bbox)
    }
  }

  public get boundingBoxArea(): number | undefined {
    if (!this.boundingBox) {
      return undefined
    }

    return this.boundingBox.getArea()
  }

  public get epsgCode(): string | undefined {
    if (this.crs.code) {
      return `EPSG:${this.crs.code}`
    }

    return undefined
  }

  public get isExplicitMetreBased(): boolean {
    if (this.crs.unit) {
      return this.crs.unit.toLowerCase().indexOf('metre') > -1
    }

    return false
  }

  public get name(): string {
    return this.crs.name ?? ''
  }

  public get area(): string {
    return this.crs.area ?? ''
  }

  public get srid(): number | undefined {
    if (!this.crs.code) {
      return undefined
    }

    const nr = parseInt(this.crs.code)
    if (!isNaN(nr)) {
      return nr
    }

    return undefined
  }
}