import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { SelectChangeEvent } from "@mui/material/Select"
import { SortOrder } from "../shared.types"

interface SortMenuProps {
  sort: SortOrder
  onChange: (value: SortOrder) => void
}

const SortMenu = ({ onChange, sort }: SortMenuProps) => {
  const [sortOrder, setSortOrder] = useState(sort)

  const handleChange = (event: SelectChangeEvent<SortOrder>) => {
    setSortOrder(event.target.value as SortOrder)
    onChange(event.target.value as SortOrder)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 130, maxWidth: 130 }} size="small">
      <InputLabel id="sort-label">Sort By</InputLabel>
      <Select<SortOrder>
        labelId="sort-label"
        id="sort"
        value={sortOrder}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="rating">BGG Rating</MenuItem>
        <MenuItem value="myRating">My Rating</MenuItem>
        <MenuItem value="plays">Plays</MenuItem>
        <MenuItem value="rank">BGG Rank</MenuItem>
        <MenuItem value="playtime">Playtime</MenuItem>
        <MenuItem value="random">Random</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SortMenu
