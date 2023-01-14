import XYZ from 'ol/source/XYZ'
import TileLayerComponent from './TileLayerComponent'

export const GoogleMapsLayerComponent = () => {
  const source = new XYZ(
    {
      url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      attributions: '&copy; <a href="https://maps.google.com">Google maps</a>',
    }
  )
  return <TileLayerComponent source={source} zIndex={0}/>
}


export const GoogleHybridLayerComponent = () => {
  const source = new XYZ(
    {
      url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      attributions: '&copy; <a href="https://maps.google.com">Google maps</a>',
    }
  )
  return <TileLayerComponent source={source} zIndex={0}/>
}

export const GoogleSatelliteLayerComponent = () => {
  const source = new XYZ(
    {
      url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      attributions: '&copy; <a href="https://maps.google.com">Google maps</a>',
    }
  )
  return <TileLayerComponent source={source} zIndex={0}/>
}