import OSM from 'ol/source/OSM'
import TileLayerComponent from './TileLayerComponent'

const OSMLayerComponent = () => {
  return <TileLayerComponent source={new OSM()} zIndex={0}/>
}

export default OSMLayerComponent