import * as React from 'react'

interface IControlsProps {

}

const ControlsComponent = (p: React.PropsWithChildren<IControlsProps>) => {
  return <div>{p.children}</div>
}

export default ControlsComponent