import img_coordinate_systems from '../../img/help/2_coordinate_systems.png'

const HelpPageCoordinateSystems = () => {
  return <div>
    <div>
      <h1>Coordinate systems</h1>
    </div>
    <div>
      <img src={img_coordinate_systems} alt='Coordinate systems' data-testid='img_coordinate_systems'/>
      <p>
        This let's you browse and filter the coordinate systems used in this tool.
        Helps you determine if the coordinate system you want is in the system.
      </p>
    </div>
  </div>
}

export default HelpPageCoordinateSystems