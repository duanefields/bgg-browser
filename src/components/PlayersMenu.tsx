import { MenuItem, TextField } from "@mui/material"
import { PlayerCount, PLAYER_COUNTS } from "../shared.types"

type PlayersMenuProps = {
  players: PlayerCount
  onChange: (value: PlayerCount) => void
}

const PlayersMenu = ({ onChange, players }: PlayersMenuProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value) as PlayerCount)
  }

  const options = PLAYER_COUNTS.filter((i) => i > 0).map((i) => (
    <MenuItem key={i} value={i}>
      {i} {i === 1 ? "Player" : "Players"}
    </MenuItem>
  ))

  return (
    <TextField
      sx={{ minWidth: 100, maxWidth: 100 }}
      select
      value={players}
      label="Players"
      onChange={handleChange}
      size="small"
    >
      <MenuItem key={0} value={0}>
        Any
      </MenuItem>
      {options}
    </TextField>
  )
}

export default PlayersMenu
