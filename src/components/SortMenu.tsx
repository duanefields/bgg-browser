import { MenuItem, TextField } from "@mui/material"
import { SortOrder } from "../shared.types"

type SortMenuProps = {
  sort: SortOrder
  onChange: (value: SortOrder) => void
}

const SortMenu = ({ onChange, sort }: SortMenuProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as SortOrder)
  }

  return (
    <TextField
      sx={{ minWidth: 120 }}
      select
      value={sort}
      label="Sort By"
      onChange={handleChange}
      size="small"
    >
      <MenuItem value="name">Name</MenuItem>
      <MenuItem value="rating">BGG Rating</MenuItem>
      <MenuItem value="myRating">My Rating</MenuItem>
      <MenuItem value="plays">Plays</MenuItem>
      <MenuItem value="rank">BGG Rank</MenuItem>
      <MenuItem value="playtime">Playtime</MenuItem>
      <MenuItem value="random">Random</MenuItem>
    </TextField>
  )
}

export default SortMenu
