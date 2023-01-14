
import CoordinateSystemIndex from './CoordinateSystemIndex'

describe('Coordinate systems', () => {
    test('Make sure coordinate systems are loaded', () => {
        const crs = CoordinateSystemIndex.getCoordinateSystemIndex()
        expect(crs).not.toBeUndefined()
    })
})