import { render, screen } from '@testing-library/react'
import HelpButtonControl from './HelpButtonControl'


describe('<HelpButton/>', () => {

  test('Testing the help button', () => {
    render(<HelpButtonControl/>)
    const element = screen.getByText('?')
    expect(element).toBeInTheDocument()
  })
})