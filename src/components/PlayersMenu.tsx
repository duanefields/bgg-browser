import { MenuItem, TextField } from "@mui/material"
import { useState } from "react"
import { PlayerCount } from "../shared.types"

interface PlayersMenuProps {
  players: PlayerCount
  onChange: (value: PlayerCount) => void
}

const PlayersMenu = ({ onChange, players }: PlayersMenuProps) => {
  const [playerCount, setPlayerCount] = useState<PlayerCount>(players)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(Number(event.target.value) as PlayerCount)
    onChange(Number(event.target.value) as PlayerCount)
  }

  const options: React.ReactNode[] = []
  for (let i = 2; i <= 12; i++) {
    options.push(
      <MenuItem key={i} value={i}>
        {i} Players
      </MenuItem>,
    )
  }

  return (
    <TextField
      sx={{ m: 1, minWidth: 130, maxWidth: 130 }}
      select
      value={playerCount}
      label="Players"
      onChange={handleChange}
      size="small"
    >
      <MenuItem key={0} value={0}>
        Any
      </MenuItem>
      <MenuItem key={1} value={1}>
        1 Player
      </MenuItem>
      {options}
    </TextField>
  )
}

export default PlayersMenu
