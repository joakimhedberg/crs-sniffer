import VectorSource from 'ol/source/Vector'
import { useContext, useMemo } from 'react'
import OLVectorLayer from 'ol/layer/Vector'
import MapContext from '../../../../context/MapContext'
import { FlatStyleLike } from 'ol/style/flat'
import { StyleLike } from 'ol/style/Style'

interface IVectorLayerComponentProps {
  source: VectorSource
  zIndex: number,
  style?: StyleLike | FlatStyleLike | null
}

const VectorLayerComponent = (p: IVectorLayerComponentProps) => {
  const map = useContext(MapContext)

  useMemo(() => {
    if (!map.map) return
    const vectorLayer = new OLVectorLayer({
      source: p.source,
      zIndex: p.zIndex,
      style: p.style
    })

    map.map.addLayer(vectorLayer)
    vectorLayer.setZIndex(p.zIndex)
    return () => {
      if (map.map) {
        map.map.removeLayer(vectorLayer)
      }
    }
  }, [map.map, p.source, p.zIndex, p.style])

  return null
}

export default VectorLayerComponent