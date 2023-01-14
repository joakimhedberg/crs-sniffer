import WKT from 'ol/format/WKT'
import { Geometry } from 'ol/geom'
import CoordinateSystemTransformation from './CoordinateSystemTransformation'
import CoordinateSystemIndex from './static/CoordinateSystemIndex'
import GeometryHelpers from './static/helpers/GeometryHelpers'

describe('Coordinate system transformations', () => {
  let transformation: CoordinateSystemTransformation | undefined = undefined
  let geomEpsg3857: Geometry | undefined = undefined
  let geomEpsg3011: Geometry | undefined = undefined
  beforeAll(() => {
    const crs = CoordinateSystemIndex.getCoordinateSystemIndex()?.get(3011)
    if (!crs) {
      return
    }
    
    geomEpsg3857 = GeometryHelpers.wktToSimpleGeometry('Point (2257552.58970653 9298057.8308268)')
    geomEpsg3011 = GeometryHelpers.wktToSimpleGeometry('Point (264122.79676174 7079951.14672506)')
    if (!(geomEpsg3857 && geomEpsg3011)) {
      return
    }

    transformation = new CoordinateSystemTransformation(crs)
  })
  test('Testing forward transformation', () => {
    if (!(transformation && geomEpsg3857)) {
      return
    }
    const geomToEpsg3011 = transformation.transformGeometryForward(geomEpsg3857)
    expect(new WKT().writeGeometry(geomToEpsg3011)).toEqual('POINT(262357.41072446416 7079078.973242178)')
  })

  test('Testing backward transformation', () => {
    if (!(transformation && geomEpsg3011)) {
      return
    }
    const geomToEpsg3857 = transformation.transformGeometryBackward(geomEpsg3011)
    expect(new WKT().writeGeometry(geomToEpsg3857)).toEqual('POINT(2261607.926463651 9299885.23930296)')
  })
})