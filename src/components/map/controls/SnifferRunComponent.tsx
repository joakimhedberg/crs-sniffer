import WKT from 'ol/format/WKT'
import { Point, Polygon } from 'ol/geom'
import Draw from 'ol/interaction/Draw'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { useState, useRef, useContext, useEffect } from 'react'
import { Form, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import CoordinateTransformationIndex from '../../../classes/crs/static/CoordinateTransformationIndex'
import GeometryHelpers from '../../../classes/crs/static/helpers/GeometryHelpers'
import WktConverter from '../../../classes/crs/static/helpers/WktConverter'
import CrsSnifferContext from '../../../context/CrsSnifferContext'
import MapContext from '../../../context/MapContext'
import TooltipButton from '../../general/TooltipButton'

const SnifferRunComponent = () => {
  const [wkt_unknown_geom, setWktUnknownGeom] = useState<string>('')
  const fileRef = useRef<HTMLInputElement>(null)
  const [tool, setTool] = useState<'point' | 'polygon'>()
  const map = useContext(MapContext).map
  const snifferContext = useContext(CrsSnifferContext)

  useEffect(() => {
    if (wkt_unknown_geom) {
      const geom = GeometryHelpers.wktToSimpleGeometry(wkt_unknown_geom)
      snifferContext.setUnknownGeometry(geom)
    }
    else {
      snifferContext.setUnknownGeometry(undefined)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wkt_unknown_geom])

  useEffect(() => {
    if (tool === 'point' && map) {
      const source = new VectorSource<Point>(
        {
          features: []
        }
      )
      const draw = new Draw({
        source: source,
        type: 'Point'
      })

      draw.on('drawstart', (e) => {
        source.clear()
      })

      draw.on('drawend', (e) => {
        if (e.feature && e.feature.getGeometry() as Point) {
          const pt = e.feature.getGeometry() as Point
          if (pt) {
            snifferContext.setReferencePoint(pt)
            setTool(undefined)
          }
        }
      })

      const vl = new VectorLayer({ source: source })
      map.addLayer(vl)
      map.addInteraction(draw)

      return () => {
        map.removeLayer(vl)
        map.removeInteraction(draw)
        draw.dispose()
        vl.dispose()
      }
    }
    else if (tool === 'polygon' && map) {
      const source = new VectorSource<Polygon>(
        {
          features: []
        }
      )

      const draw = new Draw({
        source: source,
        type: 'Polygon'
      })

      draw.on('drawstart', (e) => {
        source.clear()
      })

      draw.on('drawend', (e) => {
        if (e.feature && e.feature.getGeometry() as Polygon) {
          const poly = e.feature.getGeometry() as Polygon
          if (poly) {
            snifferContext.setReferencePolygon(poly)
          }
          setTool(undefined)
        }
      })

      const vl = new VectorLayer({ source: source })
      map.addLayer(vl)
      map.addInteraction(draw)

      return () => {
        map.removeLayer(vl)
        map.removeInteraction(draw)
        draw.dispose()
        vl.dispose()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool, map])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file) {
        WktConverter.convertFileToWkt(file).then(wkt => {
          if (wkt) {
            setWktUnknownGeom(wkt)
          }
        })
      }
    }
  }

  const handleStartSniffing = () => {
    if (snifferContext.unknownGeometry) {
      const result = CoordinateTransformationIndex.getPossibleCoordinateSystems(snifferContext.unknownGeometry, snifferContext.referencePoint, snifferContext.referencePolygon)
      snifferContext.setResults(result)
    }
  }

  return <Form>
      <Container fluid>
        <Form.Group>
          <Row>
            <OverlayTrigger trigger='click' overlay={<Tooltip>{snifferContext.referencePoint? new WKT().writeGeometry(snifferContext.referencePoint): ''}</Tooltip>}>
              <Col>
                Reference point
              </Col>
            </OverlayTrigger>
            <Col>
              <TooltipButton tooltip='Pick reference point from map' variant={snifferContext.referencePoint !== undefined ? 'success' : 'outline-success'} onClick={() => setTool('point')}>Pick</TooltipButton>
            </Col>
            <Col>
              <TooltipButton tooltip='Clear reference point' variant={snifferContext.referencePoint !== undefined? 'danger': 'outline-danger'} disabled={snifferContext.referencePoint === undefined} onClick={() => snifferContext.setReferencePoint(undefined)}>Clear</TooltipButton>
            </Col>
          </Row>
          <Row>
            <OverlayTrigger trigger='click' overlay={<Tooltip>{snifferContext.referencePolygon? new WKT().writeGeometry(snifferContext.referencePolygon): ''}</Tooltip>}>
              <Col>
                Reference polygon
              </Col>
            </OverlayTrigger>
            <Col>
              <TooltipButton tooltip='Draw a polygon boundary for the expected output' variant={snifferContext.referencePolygon !== undefined ? 'success' : 'outline-success'} onClick={() => setTool('polygon')}>Draw</TooltipButton>
            </Col>
            <Col>
              <TooltipButton tooltip='Clear polygon boundary' variant={snifferContext.referencePolygon !== undefined? 'danger': 'outline-danger'} disabled={snifferContext.referencePolygon === undefined} onClick={() => snifferContext.setReferencePolygon(undefined)}>Clear</TooltipButton>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Label>Wkt unknown geometry</Form.Label>
          <Form.Control type='input' value={wkt_unknown_geom} onChange={(e) => setWktUnknownGeom(e.target.value)} />
          <input type='file' ref={fileRef} onChange={handleFileChange} accept='.shp, .json, .dxf' />
          <TooltipButton variant='success' tooltip='Select your file with the unknown coordinate system. Allowed file types are Shapefiles, GeoJSON and dxf.' onClick={() => fileRef.current?.click()}>
            Select file
          </TooltipButton>
        </Form.Group>
        <Form.Group>
          <Form.Label>Start sniffing</Form.Label>
          <TooltipButton tooltip='Run the sniffer process' onClick={() => handleStartSniffing()} disabled={snifferContext.unknownGeometry === undefined}>Start</TooltipButton>
        </Form.Group>
      </Container>
    </Form>
}

export default SnifferRunComponent