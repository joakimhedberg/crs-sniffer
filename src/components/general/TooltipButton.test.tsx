import { render, screen } from '@testing-library/react'
import TooltipButton from './TooltipButton'

describe('<TooltipButton/>', () => {
  test('Testing the tooltip button', () => {
    render(<TooltipButton tooltip='Test tooltip' onClick={() => { }}>Testing</TooltipButton>)
    const buttonItem = screen.getByTestId('tooltip-button')
    expect(buttonItem).not.toBeUndefined()
    expect(buttonItem).toHaveTextContent('Testing')
  })
})