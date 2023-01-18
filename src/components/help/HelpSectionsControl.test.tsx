import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import HelpContext from '../../context/HelpContext'
import HelpSectionsControl, { MenuChoice } from './HelpSectionsControl'

const HelpSectionsControlMock = () => {
  return <HelpContext.Provider value={{ is_help_visible: true, setIsHelpVisible: () => { } }}>
    <HelpSectionsControl/>
  </HelpContext.Provider>
}

const testItem = (choice: MenuChoice) => {
  return test(`Testing menu choice ${choice}`, () => {
    render(<HelpSectionsControlMock />)

    const element = screen.getByTestId(`${choice}_testid`)
    expect(element).toBeInTheDocument()
    
    act(() => {
      element.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const img = screen.getByTestId(`img_${choice}`)
    expect(img).toBeInTheDocument()
  })
}

describe('<HelpSectionsControl/>', () => {
  testItem('background_map')
  testItem('coordinate_sniffer')
  testItem('sniffer_results')
  testItem('coordinate_systems')
  testItem('main')
})