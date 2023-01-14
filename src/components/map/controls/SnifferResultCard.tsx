import { useContext } from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import CrsSnifferResult from '../../../classes/crs/CoordinateSnifferResult'
import CrsSnifferContext from '../../../context/CrsSnifferContext'

interface ISnifferResultCardProps {
  snifferResult: CrsSnifferResult
}

/**
 * Card to display a sniffer result
 * @param p Properties, sniffer_result
 * @returns SnifferResultCard component
 */
const SnifferResultCard = (p: ISnifferResultCardProps) => {
  const snifferContext = useContext(CrsSnifferContext)
  
  /**
   * Toggle the active result selection
   */
  const handleCardClick = () => {
    if (snifferContext.selectedResult === p.snifferResult) {
      snifferContext.setSelectedResult(undefined)
    }
    else {
      snifferContext.setSelectedResult(p.snifferResult)
    }
  }

  /**
   * Set the active boundary polygon, this will trigger the map to display the bounding box
   * @param e Mouse Event
   */
  const handleShowBoundingBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (snifferContext.boundaryPolygon === p.snifferResult.boundingBox) {
      snifferContext.setBoundaryPolygon(undefined)
    } else {
      snifferContext.setBoundaryPolygon(p.snifferResult.boundingBox)
    }
  }

  return <Card key={p.snifferResult.crsCode} bg={snifferContext.selectedResult === p.snifferResult ? 'success' : 'warning'} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
  <Card.Header><Badge pill>{p.snifferResult.uniqueId}</Badge>{p.snifferResult.crsCode}</Card.Header>
  <Card.Body>
    <Card.Title>{p.snifferResult.crsName}</Card.Title>
    <Card.Text>{p.snifferResult.crsArea}</Card.Text>
    {p.snifferResult.boundingBox && <Button variant='primary' size='sm' onClick={handleShowBoundingBox}>Show crs bounding box</Button>}
  </Card.Body>
</Card>
}

export default SnifferResultCard