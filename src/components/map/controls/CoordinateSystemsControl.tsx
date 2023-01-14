import { useEffect, useRef, useState } from 'react'
import CoordinateSystem from '../../../classes/crs/CoordinateSystem'
import CoordinateSystemIndex from '../../../classes/crs/static/CoordinateSystemIndex'
import ArrayHelpers from '../../../classes/crs/static/helpers/ArrayHelpers'
import debounce from 'lodash.debounce'
import { Form, Pagination } from 'react-bootstrap'
import './CoordinateSystemsControl.scss'

const CoordinateSystemsControl = () => {
  const [coordinate_systems, setCoordinateSystems] = useState<CoordinateSystem[][]>([])
  const [selected_page, setSelectedPage] = useState<number>()

  const [filter, setFilter] = useState('')
  const PAGE_COUNT = 20
  
  // Delay the update of the filter with 500ms, otherwise it gets a bit slow.
  const filterChangedTimeout = useRef(debounce(value => {
    setFilter(value)
  }, 500)).current

  const isCrsFilterMatch = (crs: CoordinateSystem, filter: string): boolean => {
    if (!filter) {
      return true
    }
    const lower_filter = filter.toLowerCase()
    return crs.name.toLowerCase().indexOf(lower_filter) > -1 || (crs.epsgCode ?? '').toLowerCase().indexOf(lower_filter) > -1
  }

  useEffect(() => {
    setCoordinateSystems(ArrayHelpers.splitArray(CoordinateSystemIndex.getCoordinateSystemList().filter(crs => isCrsFilterMatch(crs, filter)), PAGE_COUNT))
  }, [filter])


  return <div className='coordinate_systems_control'>
    <div style={{overflowX: 'scroll'}}>
      <Pagination>
        {coordinate_systems.map((vp, idx) => <Pagination.Item key={idx} onClick={() => setSelectedPage(idx)} active={selected_page === idx}>{idx + 1}</Pagination.Item>)}
      </Pagination>
    </div>
    <div>
      <Form.Control type='text' onChange={(e) => filterChangedTimeout(e.target.value)}/>
    </div>
    {
      selected_page !== undefined && coordinate_systems[selected_page] && coordinate_systems[selected_page].map(res => (
        <div key={res.epsgCode} style={{border: 'solid 1px black'}}>
          <div>{res.epsgCode}</div>
          <div>{res.name}</div>
          <div>{res.area}</div>
        </div>
        )
      )
    }
  </div>
}

export default CoordinateSystemsControl