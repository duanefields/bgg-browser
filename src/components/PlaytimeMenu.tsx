import { MenuItem, TextField } from "@mui/material"
import { useState } from "react"
import { Playtime } from "../shared.types"

type PlaytimeMenuProps = {
  playtime: Playtime
  onChange: (value: Playtime) => void
}

const PlaytimeMenu = ({ onChange, playtime }: PlaytimeMenuProps) => {
  const [playtimeValue, setPlaytimeValue] = useState<Playtime>(playtime)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaytimeValue(Number(event.target.value) as Playtime)
    onChange(Number(event.target.value) as Playtime)
  }

  const optionValues = [15, 30, 45, 60, 90, 120, 150, 180]
  const options: React.ReactNode[] = []
  optionValues.forEach((i) => {
    options.push(
      <MenuItem key={i} value={i}>
        {i} mins
      </MenuItem>,
    )
  })

  return (
    <TextField
      sx={{ minWidth: 100, maxWidth: 100 }}
      select
      value={playtimeValue}
      label="Playtime"
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

export default PlaytimeMenu
