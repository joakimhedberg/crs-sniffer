import img_example_result_reference_point from '../../img/help/example_result_reference_point.png'
import img_example_result_reference_polygon from '../../img/help/example_result_reference_polygon.png'
import img_example_show_crs_bounding_box from '../../img/help/example_show_crs_bounding_box.png'

const HelpPageSnifferResults = () => {
  return <div>
    <h1>Crs sniffer results</h1>
    <ExampleItem title='Reference point was used' img_source={img_example_result_reference_point} img_alt='Reference point' description='Displayed is the unknown geometry(polygon), the reference point and a line connecting them, the distance between them.' data_testid='img_sniffer_results'/>
    <ExampleItem title='Reference polygon was used' img_source={img_example_result_reference_polygon} img_alt='Reference polygon' description='Displayed is the unknown geometry(polygon) and the reference polygon where the geometry was contained.'/>
    <ExampleItem title='Bounding box' img_source={img_example_show_crs_bounding_box} img_alt='Bounding box' description='Clicking the "Show crs bounding box" will zoom out and display the bounds for the coordinate system.'/>
  </div>
}

const ExampleItem = (p: {title: string, img_source: string, img_alt: string, description: string, data_testid?: string}) => {
  return <div>
    <h3>{p.title}</h3>
    <i>{p.description}</i>
    <div>
      <img src={p.img_source} alt={p.img_alt} data-testid={p.data_testid} />
    </div>
  </div>
}

export default HelpPageSnifferResults