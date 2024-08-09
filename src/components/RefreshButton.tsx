import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"

type RefreshButtonProps = {
  spin: boolean
  onClick: () => void
}

const RefreshButton = ({ spin, onClick }: RefreshButtonProps) => {
  return (
    <IconButton aria-label="refresh" onClick={onClick}>
      <FontAwesomeIcon icon={faSync} spin={spin} />
    </IconButton>
  )
}

export default RefreshButton
