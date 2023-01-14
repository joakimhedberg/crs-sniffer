import { Point, Polygon } from 'ol/geom'
import CoordinateTransformationIndex from './CoordinateTransformationIndex'
import GeometryHelpers from './helpers/GeometryHelpers'

// eslint-disable-next-line jest/valid-title
const wktStringTest = (testTitle: string, wktString: string, equalResult: string, referencePointWkt?: string, referencePolygonWkt?: string) => test(testTitle, () => {
  const geom = GeometryHelpers.wktToSimpleGeometry(wktString)
  expect(geom).not.toBeUndefined()
  
  if (geom === undefined) {
    return
  }

  let referencePoint: Point | undefined = undefined
  let referencePolygon: Polygon | undefined = undefined
  if (referencePointWkt) {
    referencePoint = GeometryHelpers.wktToSimpleGeometry(referencePointWkt) as Point
  }

  if (referencePolygonWkt) {
    referencePolygon = GeometryHelpers.wktToSimpleGeometry(referencePolygonWkt) as Polygon
  }

  const result = CoordinateTransformationIndex.getPossibleCoordinateSystems(geom, referencePoint, referencePolygon)
  expect(result[0].crsCode).toEqual(equalResult)
})

describe('Transformations', () => {
  test('Make sure coordinate system transformations are loaded', () => {
    const transformations = CoordinateTransformationIndex.getTransformations()
    expect(transformations.length).toBeGreaterThan(0)
  })

  wktStringTest('Try to sniff out coordinate system with EPSG:3012', 'MULTIPOLYGON (((169782.05875344557 7007420.271007532, 169793.48905286394 7007428.205153588, 169813.61177947817 7007400.736854625, 169802.05408002198 7007391.802092142, 169782.05875344557 7007420.271007532)))', 'EPSG:3012')
  wktStringTest('Try to sniff out coordinate system with EPSG:3857', 'Point (2257552.58970653 9298057.8308268)', 'EPSG:3857', undefined, 'POLYGON((2254619.6255450253 9300542.03197171,2259288.1263209768 9299623.035755971,2261346.6778442306 9296792.527411496,2261015.8392065647 9294072.298612911,2258773.488440163 9292565.1448191,2254472.5861505074 9296094.090287535,2254619.6255450253 9300542.03197171))')
  wktStringTest('Try to sniff out coordinate system with EPSG:4308', 'LineString (20.26960187 63.79849402, 20.29982661 63.78334803)', 'EPSG:4308', 'POINT(2257910.8097484787 9297445.501246035)')
})
