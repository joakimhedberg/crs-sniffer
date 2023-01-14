import { Geometry, Point, Polygon } from 'ol/geom'
import { createContext } from 'react'
import CrsSnifferResult from '../classes/crs/CoordinateSnifferResult'

interface ICrsSnifferContext {
  referencePoint: Point | undefined
  setReferencePoint: (point: Point | undefined) => void
  referencePolygon: Polygon | undefined
  setReferencePolygon: (polygon: Polygon | undefined) => void
  unknownGeometry: Geometry | undefined
  setUnknownGeometry: (geometry: Geometry | undefined) => void
  results: CrsSnifferResult[]
  setResults: (results: CrsSnifferResult[]) => void
  clearResults: () => void
  selectedResult?: CrsSnifferResult
  setSelectedResult: (result?: CrsSnifferResult) => void
  boundaryPolygon: Polygon | undefined
  setBoundaryPolygon: (polygon?: Polygon) => void
}

const CrsSnifferContext = createContext<ICrsSnifferContext>({
  referencePoint: undefined,
  setReferencePoint: () => { },
  referencePolygon: undefined,
  setReferencePolygon: () => { },
  unknownGeometry: undefined,
  setUnknownGeometry: () => { },
  results: [],
  setResults: () => { },
  clearResults: () => { },
  setSelectedResult: () => { },
  boundaryPolygon: undefined,
  setBoundaryPolygon: () => { }
})

export default CrsSnifferContext