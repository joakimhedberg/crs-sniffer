import Feature, { FeatureLike } from 'ol/Feature'
import VectorSource from 'ol/source/Vector'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import { useContext, useEffect, useMemo } from 'react'
import CrsSnifferContext from '../../../context/CrsSnifferContext'
import VectorLayerComponent from './base/VectorLayerComponent'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'

const CrsSnifferLayers = () => {
  const crsContext = useContext(CrsSnifferContext)
  const source = useMemo(() =>  new VectorSource({
    features: []
  }), [])

  const vectorStyle = useMemo(() => (feature: FeatureLike, resolution?: number) => {
    const type = feature.get('type')
    if (type === 'point') {
      return new Style({
        image: new Circle({
          fill: new Fill({
            color: 'green'
          }),
          stroke: new Stroke({
            width: 1,
            color: 'darkgreen'
          }),
          radius: 10
      })
      })
    }
    else if (type === 'polygon') {
      return new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
          lineDash: [.5, 5]
      })
    })
    }
  }, [])

  useEffect(() => {
    if (!source) {
      return
    }

    if (crsContext.referencePoint) {
      const feature = new Feature({
        geometry: crsContext.referencePoint,
      })
      feature.set('type', 'point')
      source.addFeature(feature)
    }

    if (crsContext.referencePolygon) {
      const feature = new Feature({
        geometry: crsContext.referencePolygon
      })
      feature.set('type', 'polygon')
      source.addFeature(feature)
    }

    return () => {
      source.clear()
    }
  }, [crsContext.referencePoint, crsContext.referencePolygon, crsContext.unknownGeometry, source])
  return <VectorLayerComponent source={source} zIndex={20} style={vectorStyle} />
}

export default CrsSnifferLayers