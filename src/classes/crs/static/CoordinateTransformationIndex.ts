import { Geometry, Point, Polygon } from 'ol/geom'
import CoordinateSystemTransformation from '../CoordinateSystemTransformation'
import CoordinateSystemIndex from './CoordinateSystemIndex'
import CrsSnifferResult from '../CoordinateSnifferResult'
import GeometryHelpers from './helpers/GeometryHelpers'

export default class CoordinateTransformationIndex {
  private static transformations: CoordinateSystemTransformation[] | undefined = undefined

  public static getTransformations = (): CoordinateSystemTransformation[] => {
    if (CoordinateTransformationIndex.transformations !== undefined) {
      return CoordinateTransformationIndex.transformations
    }

    const coordinateSystems = CoordinateSystemIndex.getCoordinateSystemIndex()
    if (!coordinateSystems) {
      return []
    }

    CoordinateTransformationIndex.transformations = []
    coordinateSystems.forEach(crs => {
      try {
        const transformation = new CoordinateSystemTransformation(crs)
        CoordinateTransformationIndex.transformations?.push(transformation)
      } catch { }
    })

    CoordinateTransformationIndex.transformations = CoordinateTransformationIndex.transformations.sort((a, b) => (b.coordinateSystem.boundingBoxArea ?? Number.MAX_VALUE) - (a.coordinateSystem.boundingBoxArea ?? Number.MAX_VALUE))

    return CoordinateTransformationIndex.transformations
  }

  public static getPossibleCoordinateSystems = (unknownGeometry: Geometry, referencePoint: Point | undefined, referencePolygon: Polygon | undefined, returnValues?: number): CrsSnifferResult[] => {
    let transformations = CoordinateTransformationIndex.getTransformations()
    
    const result: CrsSnifferResult[] = []
    if (referencePolygon) {
      transformations = transformations.filter(t => {
        if (t.coordinateSystem.boundingBox !== undefined) {
          return GeometryHelpers.polygonsTouch(referencePolygon, t.coordinateSystem.boundingBox)
        }
        return false
      })
    }

    let id: number = 1
    for (const trans of transformations) {
      const item = CoordinateTransformationIndex.transformationMatches(id, trans, unknownGeometry, referencePoint, referencePolygon)
      if (item) {
        id++
        result.push(item)
      }
    }
    const return_array = result.sort(CoordinateTransformationIndex.sortResults).slice(0, returnValues)
    return_array.forEach((item, idx) => item.uniqueId = idx + 1)
    return return_array
  }

  private static sortResults = (a: CrsSnifferResult, b: CrsSnifferResult): number => {
    const distance = (a.distance ?? Number.MAX_VALUE) - (b.distance ?? Number.MAX_VALUE)
    if (distance !== 0) {
      return distance
    }

    const withinBounds = (a.isWithinBounds ? 0 : 1) - (b.isWithinBounds ? 0 : 1)
    if (withinBounds !== 0) {
      return withinBounds
    }

    const smallestArea = a.boundingBoxArea - b.boundingBoxArea
    return smallestArea
  }

  private static transformationMatches = (nextId: number, transformation: CoordinateSystemTransformation, unknownGeometry: Geometry, referencePoint: Point | undefined, referencePolygon: Polygon | undefined): CrsSnifferResult | undefined => {
    if (referencePoint && transformation.coordinateSystem.boundingBox) {
      const coords = referencePoint.getCoordinates()
      if (!transformation.coordinateSystem.boundingBox.containsXY(coords[0], coords[1])) {
        return undefined
      }
    }
    
    if (referencePolygon) {
      if (!transformation.coordinateSystem.boundingBox) {
        return undefined
      }
      
      if (!GeometryHelpers.polygonsTouch(referencePolygon, transformation.coordinateSystem.boundingBox)) {
          return undefined
      }

      const transformedPolygon = transformation.transformGeometryForward(referencePolygon) as Polygon
      if (!GeometryHelpers.polygonTouchGeometry(transformedPolygon, unknownGeometry)) {
        return undefined
      }
    }

    const unknownEpsg3857 = transformation.transformGeometryBackward(unknownGeometry)
    const result = new CrsSnifferResult(nextId, transformation, referencePoint, referencePolygon, unknownEpsg3857)
    return result
  }
}