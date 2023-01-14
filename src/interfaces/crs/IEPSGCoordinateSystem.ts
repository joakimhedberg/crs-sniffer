export default interface IEPSGCoordinateSystem {
  code: string | null
  kind: string | null
  name: string | null
  wkt: string | null
  proj4: string | null
  bbox: number[] | null
  unit: string | null
  area: string | null
  accuracy: number | null
}