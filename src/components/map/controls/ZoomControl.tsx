import { useContext, useEffect } from 'react'
import { Zoom, ZoomSlider } from 'ol/control'
import MapContext from '../../../context/MapContext'

const ZoomControlControl = () => {
  const { map } = useContext(MapContext)
  
  useEffect(() => {
    if (!map) return

    const zoomControl = new Zoom({})
    const zoomSlider = new ZoomSlider({})
    map.getControls().push(zoomControl)
    map.getControls().push(zoomSlider)

    return () => {
      map.getControls().remove(zoomControl)
      map.getControls().remove(zoomSlider)
    }
  }, [map])

  return null
}


export default ZoomControlControl