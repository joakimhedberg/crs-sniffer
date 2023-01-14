import { Feature } from 'ol'
import VectorSource from 'ol/source/Vector'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import { useContext, useEffect, useMemo } from 'react'
import CrsSnifferContext from '../../../context/CrsSnifferContext'
import MapContext from '../../../context/MapContext'
import VectorLayerComponent from './base/VectorLayerComponent'

const CrsBoundaryLayer = () => {
  const crsContext = useContext(CrsSnifferContext)
  const mapContext = useContext(MapContext)

  const source = useMemo(() => new VectorSource({
    features: []
  }), [])

  useEffect(() => {
    if (crsContext.boundaryPolygon) {
      source.addFeature(new Feature({ geometry: crsContext.boundaryPolygon }))
      const view = mapContext.map?.getView()
      if (view) {
        view.fit(crsContext.boundaryPolygon)
      }

      return () => {
        source.clear()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crsContext.boundaryPolygon])

  return <VectorLayerComponent source={source} style={() => new Style({stroke: new Stroke({color: 'green', width: 10})})} zIndex={22}/>
}

export default CrsBoundaryLayer