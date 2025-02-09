import { MenuItem, TextField } from "@mui/material"
import { useState } from "react"
import { PlayerCount } from "../shared.types"
import { getRouteApi } from "@tanstack/react-router"

type PlayersMenuProps = {
  players: PlayerCount
  onChange: (value: PlayerCount) => void
}

const routeApi = getRouteApi("/user/$username")

const PlayersMenu = ({ onChange, players }: PlayersMenuProps) => {
  const [playerCount, setPlayerCount] = useState<PlayerCount>(players)
  const navigate = routeApi.useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayerCount = Number(event.target.value) as PlayerCount
    setPlayerCount(newPlayerCount)
    onChange(newPlayerCount)
    void navigate({ search: { players: newPlayerCount } })
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
      sx={{ minWidth: 100, maxWidth: 100 }}
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
