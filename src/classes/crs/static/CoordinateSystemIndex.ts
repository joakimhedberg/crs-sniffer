import CoordinateSystem from '../CoordinateSystem'
import EPSG_COORDINATE_SYSTEMS from 'epsg-index/all.json'
import IEPSGCoordinateSystem from '../../../interfaces/crs/IEPSGCoordinateSystem'

export default class CoordinateSystemIndex {
  private static coordinateSystems: Map<number, CoordinateSystem> | undefined
  private static coordinateSystemList: CoordinateSystem[] = []
  private static loadIndex = () => {
    if (CoordinateSystemIndex.coordinateSystems !== undefined) {
      return true
    }

    const index = EPSG_COORDINATE_SYSTEMS as { [key: number]: IEPSGCoordinateSystem }
    if (!index) {
      return false
    }

    let was_added = false
    CoordinateSystemIndex.coordinateSystems = new Map()
    for (const key in index) {
      const crs = new CoordinateSystem(index[key])
      if (crs.srid !== undefined && crs.isRegistered) {
        CoordinateSystemIndex.coordinateSystems.set(crs.srid, crs)
        CoordinateSystemIndex.coordinateSystemList.push(crs)
        was_added = true
      }
    }

    return was_added
  }

  public static getCoordinateSystemIndex = (): Map<number, CoordinateSystem> | undefined => {
    if (CoordinateSystemIndex.loadIndex()) {
      return CoordinateSystemIndex.coordinateSystems
    }

    return undefined
  }

  public static getCoordinateSystemList = (): CoordinateSystem[] => {
    if (CoordinateSystemIndex.loadIndex()) {
      return CoordinateSystemIndex.coordinateSystemList
    }
    return []
  }
}