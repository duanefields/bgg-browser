import { useState } from "react"
import Badge from "@mui/material/Badge"
import Button from "@mui/material/Button"
import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import { faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SortMenu from "./SortMenu"
import PlayersMenu from "./PlayersMenu"
import PlaytimeMenu from "./PlaytimeMenu"
import { PlayerCount, Playtime, SortOrder } from "../shared.types"

type FilterDrawerProps = {
  sort: SortOrder
  players: PlayerCount
  playtime: Playtime
  activeFilterCount: number
  onSortChange: (value: SortOrder) => void
  onPlayerChange: (value: PlayerCount) => void
  onPlaytimeChange: (value: Playtime) => void
}

const FilterDrawer = ({
  sort,
  players,
  playtime,
  activeFilterCount,
  onSortChange,
  onPlayerChange,
  onPlaytimeChange,
}: FilterDrawerProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Badge badgeContent={activeFilterCount} color="primary">
        <Button
          variant="outlined"
          size="small"
          onClick={() => setOpen(true)}
          startIcon={<FontAwesomeIcon icon={faSliders} />}
          aria-label="Open filters"
          sx={{
            borderColor: "var(--color-border-subtle)",
            color: "var(--color-text-secondary)",
            textTransform: "none",
            fontWeight: 500,
            borderRadius: "var(--radius-sm)",
            "&:hover": {
              borderColor: "var(--color-accent)",
              color: "var(--color-accent)",
              backgroundColor: "transparent",
            },
          }}
        >
          Filters
        </Button>
      </Badge>

      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            backgroundColor: "var(--color-bg-page)",
            borderTopLeftRadius: "var(--radius-lg)",
            borderTopRightRadius: "var(--radius-lg)",
            "& .MuiTextField-root": { minWidth: "100%", maxWidth: "100%" },
          }}
        >
          <SortMenu sort={sort} onChange={onSortChange} />
          <PlayersMenu players={players} onChange={onPlayerChange} />
          <PlaytimeMenu playtime={playtime} onChange={onPlaytimeChange} />
        </Box>
      </Drawer>
    </>
  )
}

export default FilterDrawer
