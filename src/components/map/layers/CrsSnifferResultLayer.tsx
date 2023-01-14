import { Feature } from 'ol'
import { FeatureLike } from 'ol/Feature'
import Circle from 'ol/style/Circle'
import VectorSource from 'ol/source/Vector'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import { useContext, useEffect, useMemo } from 'react'
import CrsSnifferContext from '../../../context/CrsSnifferContext'
import MapContext from '../../../context/MapContext'
import VectorLayerComponent from './base/VectorLayerComponent'
import { LineString, Point, Polygon } from 'ol/geom'

const CrsSnifferResultLayer = () => {
  const source = useMemo(() => new VectorSource({
    features: []
  }), [])

  const snifferContext = useContext(CrsSnifferContext)
  const mapContext = useContext(MapContext)

  const vectorStyle = useMemo(() => (feature: FeatureLike, resolution?: number) => {
    const geom = feature.getGeometry()    
    if (geom instanceof Point) {
      return new Style({
        image: new Circle({
          fill: new Fill({
            color: 'blue'
          }),
          stroke: new Stroke({
            width: 1,
            color: 'darkblue'
          }),
          radius: 10
        })
      })
    }
    else if (geom instanceof Polygon || geom instanceof LineString) {
      return new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 2,
          lineDash: [.5, 5]
        })
      })
    }
  }, [])

  useEffect(() => {
    if (snifferContext.selectedResult) {
      const feature = new Feature({ geometry: snifferContext.selectedResult.unknownGeometry })
      source.addFeature(feature)
      
      const view = mapContext.map?.getView()
      if (view) {
        const extent = feature.getGeometry()?.getExtent()
        if (extent && extent.indexOf(Infinity) < 0) {
          view.fit(extent, {maxZoom: 19})
        }
      }

      const line = snifferContext.selectedResult.resultLine
      if (line) {
        const feature = new Feature({ geometry: line })
        source.addFeature(feature)
      }
    }

    return () => {
      source.clear()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snifferContext.selectedResult])
  
  return <VectorLayerComponent source={source} style={vectorStyle} zIndex={30}/>
}

export default CrsSnifferResultLayer