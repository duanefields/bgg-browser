import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { SelectChangeEvent } from "@mui/material/Select"
import { SortOrder } from "../shared.types"

interface SortMenuProps {
  sort: SortOrder
  onChange: (value: SortOrder) => void
}

const SortMenu = ({ onChange, sort }: SortMenuProps) => {
  const [sortOrder, setSortOrder] = useState(sort)

  const handleChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as SortOrder)
    onChange(event.target.value as SortOrder)
  }

  return (
    <Box width={150}>
      <FormControl fullWidth>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
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
          <MenuItem value="random">Random</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SortMenu
