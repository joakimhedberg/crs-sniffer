import { useContext } from 'react'
import MapContext from '../../../context/MapContext'
import { GoogleMapsLayerComponent, GoogleHybridLayerComponent, GoogleSatelliteLayerComponent } from './base/GoogleLayersComponent'
import OSMLayerComponent from './base/OSMLayersComponent'


const BackgroundMapComponent = () => {
  const mapContext = useContext(MapContext)
  return mapContext.selected_background === 'OSM'? <OSMLayerComponent />:
  mapContext.selected_background === 'GoogleMap' ? <GoogleMapsLayerComponent /> :
  mapContext.selected_background === 'GoogleHybrid' ? <GoogleHybridLayerComponent /> :
  mapContext.selected_background === 'GoogleSatellite'? <GoogleSatelliteLayerComponent />: null
}

export default BackgroundMapComponent