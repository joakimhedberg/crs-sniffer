import img_background_map from '../../img/help/1_background_map.png'

const HelpPageBackgroundMap = () => {
  return <div>
    <div>
      <h1>Background map</h1>
    </div>
    <div>
      <img src={img_background_map} alt='Background map' data-testid='img_background_map' />
      <p>
        Just as the title says, this let's you choose the background map
      </p>
    </div>
  </div>
}

export default HelpPageBackgroundMap