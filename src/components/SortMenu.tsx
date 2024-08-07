import { MenuItem, TextField } from "@mui/material"
import { useState } from "react"
import { SortOrder } from "../shared.types"

interface SortMenuProps {
  sort: SortOrder
  onChange: (value: SortOrder) => void
}

const SortMenu = ({ onChange, sort }: SortMenuProps) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(sort)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOrder(event.target.value as SortOrder)
    onChange(event.target.value as SortOrder)
  }

  return (
    <TextField
      sx={{ minWidth: 100, maxWidth: 100 }}
      select
      value={sortOrder}
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
