import { MenuItem, TextField } from "@mui/material"
import { Playtime, PLAYTIMES } from "../shared.types"

type PlaytimeMenuProps = {
  playtime: Playtime
  onChange: (value: Playtime) => void
}

const PlaytimeMenu = ({ onChange, playtime }: PlaytimeMenuProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value) as Playtime)
  }

  const options = PLAYTIMES.filter((i) => i > 0).map((i) => (
    <MenuItem key={i} value={i}>
      {i} mins
    </MenuItem>
  ))

  return (
    <TextField
      sx={{ minWidth: 100, maxWidth: 100 }}
      select
      value={playtime}
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
