import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { useIsFetching, useQueryClient } from "@tanstack/react-query"

type RefreshButtonProps = {
  username: string
}

const RefreshButton = ({ username }: RefreshButtonProps) => {
  const queryClient = useQueryClient()
  const isFetching = useIsFetching()

  const onClick = () => {
    void queryClient.invalidateQueries({ queryKey: ["collection", username] })
  }

  return (
    <IconButton
      aria-label="refresh"
      onClick={onClick}
      sx={{ color: "var(--color-text-secondary)", "&:hover": { color: "var(--color-accent)" } }}
    >
      <FontAwesomeIcon icon={faSync} spin={isFetching > 0} />
    </IconButton>
  )
}

export default RefreshButton
