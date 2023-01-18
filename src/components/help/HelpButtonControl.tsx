import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import HelpContext from '../../context/HelpContext'
import './HelpButtonControl.scss'

const HelpButtonControl = () => {
  const helpContext = useContext(HelpContext)
  return <Button className='help_button' variant='info' onClick={() => helpContext.setIsHelpVisible(!helpContext.is_help_visible)}>?</Button>
}

export default HelpButtonControl