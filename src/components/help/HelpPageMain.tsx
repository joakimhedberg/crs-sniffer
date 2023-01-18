import img_help from '../../img/help/0_entire_map.png'

const HelpPageMain = () => {
  return <div>
    <div>
      <h1>Coordinate sniffer - Help</h1>
    </div>
    <div>
      <img src={img_help} alt='Map' data-testid='img_main' />
      <p>
        This let's you browse and filter the coordinate systems used in this tool.
        Helps you determine if the coordinate system you want is in the system.
      </p>
    </div>
  </div>
}

export default HelpPageMain