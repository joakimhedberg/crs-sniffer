import { createContext } from 'react'

interface IHelpContext {
  is_help_visible: boolean
  setIsHelpVisible: (is_visible: boolean) => void
}

const HelpContext = createContext<IHelpContext>({ is_help_visible: false, setIsHelpVisible: () => { } })

export default HelpContext