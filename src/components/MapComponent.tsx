import { Geometry, Point, Polygon } from 'ol/geom'
import { useState } from 'react'
import CrsSnifferResult from '../classes/crs/CoordinateSnifferResult'
import CrsSnifferContext from '../context/CrsSnifferContext'
import HelpButtonControl from './help/HelpButtonControl'
import HelpSectionsControl from './help/HelpSectionsControl'
import MapBaseComponent from './map/base/MapBaseComponent'
import BackgroundMapSelectionControl from './map/controls/BackgroundMapSelectionControl'
import ControlsComponent from './map/controls/ControlsComponent'
import CoordinateSystemsControl from './map/controls/CoordinateSystemsControl'
import FullScreenControl from './map/controls/FullScreenControl'
import SnifferControl from './map/controls/SnifferControl'
import ZoomControlControl from './map/controls/ZoomControl'
import BackgroundMapComponent from './map/layers/BackgroundMapComponent'
import CrsBoundaryLayer from './map/layers/CrsBoundaryLayer'
import CrsSnifferLayers from './map/layers/CrsSnifferLayers'
import CrsSnifferResultLayer from './map/layers/CrsSnifferResultLayer'
import MapLayersComponent from './map/layers/MapLayersComponent'

const MapComponent = () => {
  const [reference_point, setReferencePoint] = useState<Point>()
  const [reference_polygon, setReferencePolygon] = useState<Polygon>()
  const [unknown_geometry, setUnknownGeometry] = useState<Geometry>()
  const [results, setResults] = useState<CrsSnifferResult[]>([])
  const [selected_result, setSelectedResult] = useState<CrsSnifferResult>()
  const [boundary_polygon, setBoundaryPolygon] = useState<Polygon>()
  
  const clearResults = () => {
    setResults([])
    setSelectedResult(undefined)
    setBoundaryPolygon(undefined)
  }

  return <CrsSnifferContext.Provider value={{
    referencePoint: reference_point,
    setReferencePoint: setReferencePoint,
    referencePolygon: reference_polygon,
    setReferencePolygon: setReferencePolygon,
    unknownGeometry: unknown_geometry,
    setUnknownGeometry: setUnknownGeometry,
    results: results,
    setResults: setResults,
    clearResults: clearResults,
    selectedResult: selected_result,
    setSelectedResult: setSelectedResult,
    boundaryPolygon: boundary_polygon,
    setBoundaryPolygon: setBoundaryPolygon
  }}>
    <MapBaseComponent zoom={17}>
      <MapLayersComponent>
        <CrsSnifferLayers />
        <CrsSnifferResultLayer />
        <CrsBoundaryLayer/>
        <BackgroundMapComponent/>
      </MapLayersComponent>
      <ControlsComponent>
        <HelpSectionsControl/>
        <HelpButtonControl/>
        <FullScreenControl />
        <CoordinateSystemsControl/>
        <ZoomControlControl />
        <BackgroundMapSelectionControl />
        <SnifferControl/>
      </ControlsComponent>
      </MapBaseComponent>
    </CrsSnifferContext.Provider>
}

export default MapComponent