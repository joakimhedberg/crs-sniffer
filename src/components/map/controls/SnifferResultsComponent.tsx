import debounce from 'lodash.debounce'
import { useContext, useEffect, useRef, useState } from 'react'
import { Button, Pagination } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import CrsSnifferResult from '../../../classes/crs/CoordinateSnifferResult'
import ArrayHelpers from '../../../classes/crs/static/helpers/ArrayHelpers'
import CrsSnifferContext from '../../../context/CrsSnifferContext'
import SnifferResultCard from './SnifferResultCard'

/**
 * 
 * @returns Component for the sniffer results array
 */
const SnifferResultsComponent = () => {
  const snifferContext = useContext(CrsSnifferContext)
  const [filter, setFilter] = useState('')
  const [visible_pages, setVisiblePages] = useState<CrsSnifferResult[][]>([])
  const [selected_page, setSelectedPage] = useState<number>()

  // Max items per page in the result pagination
  const PAGE_COUNT = 20

  // Delay the update of the filter with 500ms, otherwise it gets a bit slow.
  const filterChangedTimeout = useRef(debounce(value => {
    setFilter(value)
  }, 500)).current

  useEffect(() => {
    setSelectedPage(0)
  }, [visible_pages, visible_pages.length])

  useEffect(() => {
    if (!filter) {
      setVisiblePages(ArrayHelpers.splitArray(snifferContext.results, PAGE_COUNT))
    }    
    else {
      setVisiblePages(ArrayHelpers.splitArray(snifferContext.results.filter(item => item.crsCode.toLowerCase().indexOf(filter.toLowerCase()) > -1 || item.crsName.toLowerCase().indexOf(filter.toLowerCase()) > - 1), PAGE_COUNT))
    }
  }, [snifferContext.results, snifferContext.results.length, filter])

  return <div style={{ overflowY: 'auto' }}>
    <Button variant='primary' as='div' style={{width: '100%'}} onClick={() => snifferContext.clearResults()}>Clear results</Button>
    <div style={{overflowX: 'scroll'}}>
      <Pagination>
        {visible_pages.map((vp, idx) => <Pagination.Item key={idx} onClick={() => setSelectedPage(idx)} active={selected_page === idx}>{idx + 1}</Pagination.Item>)}
      </Pagination>
    </div>
    <Form.Control type='text' onChange={(e) => filterChangedTimeout(e.target.value)} />
    {
      selected_page !== undefined && visible_pages[selected_page] && visible_pages[selected_page].map(res => <SnifferResultCard key={res.crsCode} snifferResult={res}/>)
    }
  </div>
}

export default SnifferResultsComponent