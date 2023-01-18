import { render, screen } from '@testing-library/react'
import MapComponent from './MapComponent'

describe('<MapComponent/>', () => {
  beforeAll(() => {
    window.ResizeObserver = require('resize-observer-polyfill')
  })

  test('Testing the map component', () => {
    render(<MapComponent />)
    expect(screen.getByTestId('map_base_div')).not.toBeUndefined()
  })
})