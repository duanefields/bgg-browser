import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { SelectChangeEvent } from "@mui/material/Select"
import { PlayerCount } from "../shared.types"

interface PlayersMenuProps {
  players: PlayerCount
  onChange: (value: PlayerCount) => void
}

const PlayersMenu = ({ onChange, players }: PlayersMenuProps) => {
  const [playerCount, setPlayerCount] = useState(players)

  const handleChange = (event: SelectChangeEvent<PlayerCount>) => {
    setPlayerCount(event.target.value as PlayerCount)
    onChange(event.target.value as PlayerCount)
  }

  const options = []
  for (let i = 2; i <= 12; i++) {
    options.push(
      <MenuItem key={i} value={i}>
        {i} Players
      </MenuItem>,
    )
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 130, maxWidth: 130 }} size="small">
      <InputLabel id="players-label">Players</InputLabel>
      <Select<PlayerCount>
        labelId="players-label"
        id="players"
        value={playerCount}
        label="Players"
        onChange={handleChange}
      >
        <MenuItem key={0} value={"0"}>
          Any
        </MenuItem>
        <MenuItem key={1} value={1}>
          1 Player
        </MenuItem>
        ,{options}
      </Select>
    </FormControl>
  )
}

export default PlayersMenu
