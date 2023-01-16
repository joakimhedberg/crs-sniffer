import { useContext } from 'react'
import './SnifferControl.scss'
import CrsSnifferContext from '../../../context/CrsSnifferContext'
import SnifferRunComponent from './SnifferRunComponent'
import SnifferResultsComponent from './SnifferResultsComponent'

const SnifferControl = () => {

  const snifferContext = useContext(CrsSnifferContext)
  return <div className='sniffer_control'>
    <div className='control_title'>Coordinate sniffer</div>
    {!(snifferContext.results && snifferContext.results.length > 0)? <SnifferRunComponent/>:
    <SnifferResultsComponent/>}
  </div>
}

export default SnifferControl