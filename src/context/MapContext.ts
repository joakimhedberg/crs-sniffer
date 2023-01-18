import * as React from 'react'
import * as ol from 'ol'

export type BackgroundMapType = 'OSM' | 'GoogleMap' | 'GoogleHybrid' | 'GoogleSatellite' | undefined
export type MapToolType = 'POLYGON' | 'POINT' | undefined
interface IMapContext {
  map?: ol.Map
  selected_background: BackgroundMapType
  setSelectedBackground: (type: BackgroundMapType) => void
}

const MapContext = React.createContext<IMapContext>({
  selected_background: 'OSM',
  setSelectedBackground: () => { },
})
export default MapContext