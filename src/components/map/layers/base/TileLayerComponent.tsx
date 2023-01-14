import TileSource from 'ol/source/Tile'
import { useContext, useEffect } from 'react'
import OLTileLayer from 'ol/layer/Tile'
import MapContext from '../../../../context/MapContext'

interface ITileLayerComponentProps {
  source: TileSource
  zIndex: number
}

const TileLayerComponent = (p: ITileLayerComponentProps) => {
  const mapContext = useContext(MapContext)

  useEffect(() => {
    if (!mapContext.map) return
    
    const tileLayer = new OLTileLayer({
      source: p.source,
      zIndex: p.zIndex
    })

    mapContext.map.getLayers().insertAt(0, tileLayer)
    tileLayer.setZIndex(p.zIndex)
    return () => {
      if (mapContext.map) {
        mapContext.map.removeLayer(tileLayer)
      }
    }
  }, [mapContext.map, p.source, p.zIndex])

  return null
}

export default TileLayerComponent