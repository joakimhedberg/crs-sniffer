import CoordinateSystem from './CoordinateSystem'

test('Testing the coordinate system class', () => {
  const crs = new CoordinateSystem({
    code: '1337',
    accuracy: null,
    area: null,
    bbox: [0, 0, 1, 1],
    kind: 'TEST',
    name: 'A test CRS',
    wkt: 'WELLKNOOOWN TEXT',
    proj4: null,
    unit: 'metre'
  })

  expect(crs.isRegistered).toBeFalsy()
  expect(crs.boundingBox).not.toBeUndefined()
})