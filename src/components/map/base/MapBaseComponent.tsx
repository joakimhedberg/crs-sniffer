import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import * as ol from 'ol'

import 'ol/ol.css'
import './MapBaseComponent.scss'
import MapContext, { BackgroundMapType } from '../../../context/MapContext'
import { IExtents } from '../../../interfaces/map/IExtents'

import { Attribution } from 'ol/control'
import HelpContext from '../../../context/HelpContext'


interface IMapComponentProps {
  zoom: number
  extents?: IExtents
}

const MapBaseComponent = (p: React.PropsWithChildren<IMapComponentProps>) => {
  const [map, setMap] = useState<ol.Map>()
  const [selected_background, setSelectedBackground] = useState<BackgroundMapType>('OSM')
  const [is_help_enabled, setIsHelpEnabled] = useState(false)

  const mapElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const attribution = new Attribution({collapsible: false})
    const initialMap = new ol.Map({
      layers: [],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
      }),
      controls: [attribution]
    })
    setMap(initialMap)
  }, [])

  useEffect(() => {
    if (map && mapElement.current) {
      map.setTarget(mapElement.current)
    }
  }, [map])

  return (
    <MapContext.Provider value={{    
      map: map,
      selected_background: selected_background,
      setSelectedBackground: setSelectedBackground
    }}>
      <HelpContext.Provider value={{is_help_visible: is_help_enabled, setIsHelpVisible: setIsHelpEnabled}}>
        <div ref={mapElement} data-testid='map_base_div' className='ol-map'>
        {p.children}
        </div>
      </HelpContext.Provider>
    </MapContext.Provider>
  )
}

export default MapBaseComponent