import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { SelectChangeEvent } from "@mui/material/Select"
import { Playtime } from "../shared.types"

interface PlaytimeMenuProps {
  playtime: Playtime
  onChange: (value: Playtime) => void
}

const PlaytimeMenu = ({ onChange, playtime }: PlaytimeMenuProps) => {
  const [playtimeValue, setPlaytimeValue] = useState(playtime)

  const handleChange = (event: SelectChangeEvent<Playtime>) => {
    setPlaytimeValue(event.target.value as Playtime)
    onChange(event.target.value as Playtime)
  }

  const optionValues = [15, 30, 45, 60, 90, 120, 150, 180]
  const options: React.ReactNode[] = []
  optionValues.forEach((i) => {
    options.push(
      <MenuItem key={i} value={i}>
        {i}m
      </MenuItem>,
    )
  })

  return (
    <FormControl sx={{ m: 1, minWidth: 130, maxWidth: 130 }} size="small">
      <InputLabel id="playtime-label">Playtime</InputLabel>
      <Select<Playtime>
        labelId="playtime-label"
        id="playtime"
        value={playtimeValue}
        label="Playtime"
        onChange={handleChange}
      >
        <MenuItem key={0} value={0}>
          Any
        </MenuItem>
        {options}
      </Select>
    </FormControl>
  )
}

export default PlaytimeMenu
