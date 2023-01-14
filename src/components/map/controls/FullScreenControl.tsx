import { useContext, useEffect } from 'react'
import { FullScreen } from 'ol/control'
import MapContext from '../../../context/MapContext'

const FullScreenControl = () => {
  const { map } = useContext(MapContext)
  
  useEffect(() => {
    if (!map) return

    const fullScreenControl = new FullScreen({})

    map.getControls().push(fullScreenControl)

    return () => { map.getControls().remove(fullScreenControl) }
  }, [map])

  return null
}


export default FullScreenControl