import img_crs_sniffer from '../../img/help/3_crs_sniffer.png'

const HelpPageCoordinateSniffer = () => {
  return <div>
    <div>
      <h1>Coordinate sniffer</h1>
    </div>
    <div>
      <img src={img_crs_sniffer} alt='Crs sniffer' data-testid='img_coordinate_sniffer' />
      <ul>
        <li>
          Reference point<br />
          <i>
            If selected, the unknown geometry will be sorted by distance to this point in the various coordinate systems
          </i>
          <ul>
            <li>
              Pick: Let's you pick a reference point from the map
            </li>
            <li>
              Clear: Clear the reference point
            </li>
          </ul>
        </li>
        <li>
          Reference polygon<br />
          <i>
            If selected, the unknown geometry will be filtered out if it is not contained within the polygon.
          </i>
          <ul>
            <li>
              Pick: Draw a polygon on the map
            </li>
            <li>
              Clear: Clear the reference polygon
            </li>
          </ul>
        </li>
        <li>
          Wkt unknown geometry<br />
          <i>
            The unknown geometry you want to sniff. Input is a well known text representation of a geometry.
          </i>
          <ul>
            <li>
              Select file: Open a file(shapefile, geojson or dxf) to load a geometry as well known text.
            </li>
          </ul>
        </li>
      </ul>
      <i>
        Minimum requirement for sniffing is the unknown geometry. But without supplying reference point or reference polygon the result might be quite inaccurate.
      </i>
    </div>
  </div>
}

export default HelpPageCoordinateSniffer