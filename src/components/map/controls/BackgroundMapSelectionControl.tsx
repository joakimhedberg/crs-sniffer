import { PropsWithChildren, useContext } from 'react'
import MapContext, { BackgroundMapType } from '../../../context/MapContext'
import './BackgroundMapSelectionControl.scss'

const BackgroundMapSelectionControl = () => {
  const mapContext = useContext(MapContext)

  const handleClick = (maptype: BackgroundMapType) => {
    mapContext.setSelectedBackground(maptype)
  }

  return <div className='background_map_control'>
    <div className='title'>Background map</div>
      <BackgroundMapItem selected={mapContext.selected_background === undefined} mapType={undefined} onClick={handleClick}>None</BackgroundMapItem>
      <BackgroundMapItem selected={mapContext.selected_background === 'OSM'} mapType='OSM' onClick={handleClick}>OpenStreetMap</BackgroundMapItem>
      <BackgroundMapItem selected={mapContext.selected_background === 'GoogleMap'} mapType='GoogleMap' onClick={handleClick}>Google streets</BackgroundMapItem>
      <BackgroundMapItem selected={mapContext.selected_background === 'GoogleHybrid'} mapType='GoogleHybrid' onClick={handleClick}>Google hybrid</BackgroundMapItem>
      <BackgroundMapItem selected={mapContext.selected_background === 'GoogleSatellite'} mapType='GoogleSatellite' onClick={handleClick}>Google satellite</BackgroundMapItem>
  </div>
}

const BackgroundMapItem = (p: PropsWithChildren<{selected: boolean, mapType: BackgroundMapType, onClick: (mapType: BackgroundMapType) => void }>) => {
  return <div className={'item' + (p.selected ? ' selected' : '')} onClick={() => p.onClick(p.mapType)}>{p.children}</div>
}

export default BackgroundMapSelectionControl