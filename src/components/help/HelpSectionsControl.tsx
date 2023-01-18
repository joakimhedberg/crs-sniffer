import { useContext, useState } from 'react'
import { Modal, Container, Row, Col } from 'react-bootstrap'
import HelpContext from '../../context/HelpContext'
import HelpPageBackgroundMap from './HelpPageBackgroundMap'
import HelpPageCoordinateSniffer from './HelpPageCoordinateSniffer'
import HelpPageCoordinateSystems from './HelpPageCoordinateSystems'

import './HelpSectionsControl.scss'
import HelpPageMain from './HelpPageMain'
import HelpPageSnifferResults from './HelpPageSnifferResults'

export type MenuChoice = 'main' | 'background_map' | 'coordinate_systems' | 'coordinate_sniffer' | 'sniffer_results'

interface IMenuItem {
  title: string
  menu_choice: MenuChoice
}

const HelpSectionsControl = () => {
  const helpContext = useContext(HelpContext)
  const [selection, setSelection] = useState<MenuChoice>('main')

  const menu_items: IMenuItem[] = [
    {
      title: 'Help',
      menu_choice: 'main'
    },
    {
      title: 'Background map',
      menu_choice: 'background_map'
    },
    {
      title: 'Coordinate systems',
      menu_choice: 'coordinate_systems'
    },
    {
      title: 'Coordinate sniffer',
      menu_choice: 'coordinate_sniffer'
    },
    {
      title: 'Sniffer results',
      menu_choice: 'sniffer_results'
    }
  ]

  const handleSetMenuItem = (choice: MenuChoice) => {
    if (choice === selection && choice !== 'main') {
      setSelection('main')
    } else {
      setSelection(choice)
    }
  }

  const getMenuItemClass = (choice: MenuChoice) => {
    const classNames: string[] = ['menu_item']
    if (selection === choice) {
      classNames.push('selected')
    }
    return classNames.join(' ')
  }

  return <Modal className='help_sections' show={helpContext.is_help_visible} fullscreen={true} onHide={() => helpContext.setIsHelpVisible(false)} scrollable>
      <Modal.Header closeButton>
        <h1>Coordinate reference system sniffer help</h1>
    </Modal.Header>
    <Modal.Body>
      <Container fluid>
        <Row>
          <Col>
            <div className='menu'>
              {menu_items.map(mi => <div className={getMenuItemClass(mi.menu_choice)} key={mi.menu_choice} data-testid={`${mi.menu_choice}_testid`} onClick={() => handleSetMenuItem(mi.menu_choice)}>
                {mi.title}
              </div>)}
            </div>
          </Col>
          <Col xs={10}>
            <div className='content'>
              {
                selection === 'background_map' ? <HelpPageBackgroundMap /> :
                selection === 'coordinate_systems' ? <HelpPageCoordinateSystems /> :
                selection === 'coordinate_sniffer' ? <HelpPageCoordinateSniffer /> :
                selection === 'sniffer_results'? <HelpPageSnifferResults/>:
                <HelpPageMain/>
              }
              </div>
            </Col>
        </Row>
      </Container>
    </Modal.Body>
    </Modal>
}

export default HelpSectionsControl