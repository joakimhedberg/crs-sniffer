import { PropsWithChildren } from 'react'
import { Button } from 'react-bootstrap'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { ButtonVariant } from 'react-bootstrap/esm/types'

interface ITooltipButtonProps {
  tooltip: string
  variant?: ButtonVariant
  onClick: React.MouseEventHandler | undefined
  disabled?: boolean
}

const TooltipButton = (p: PropsWithChildren<ITooltipButtonProps>) => {
  return <OverlayTrigger overlay={<Tooltip data-testid='tooltip'>{p.tooltip}</Tooltip>}>
    <Button data-testid='tooltip-button' variant={p.variant} onClick={p.onClick} size='sm' style={{margin: '2px', width: '100%'}} disabled={p.disabled}>
      {p.children}
    </Button>
  </OverlayTrigger>
}

export default TooltipButton