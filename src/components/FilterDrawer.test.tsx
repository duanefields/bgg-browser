import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it, vi } from "vitest"
import FilterDrawer from "./FilterDrawer"
import { PlayerCount, Playtime, SortOrder } from "../shared.types"

const defaultProps = {
  sort: "name" as SortOrder,
  players: 0 as PlayerCount,
  playtime: 0 as Playtime,
  activeFilterCount: 0,
  onSortChange: vi.fn(),
  onPlayerChange: vi.fn(),
  onPlaytimeChange: vi.fn(),
}

it("Should render the Filters button", () => {
  render(<FilterDrawer {...defaultProps} />)
  expect(screen.getByRole("button", { name: /open filters/i })).toBeVisible()
})

it("Should not show the filter controls initially", () => {
  render(<FilterDrawer {...defaultProps} />)
  expect(screen.queryByLabelText("Sort By")).not.toBeInTheDocument()
})

it("Should open the drawer when the button is clicked", async () => {
  const user = userEvent.setup()
  render(<FilterDrawer {...defaultProps} />)
  await user.click(screen.getByRole("button", { name: /open filters/i }))
  expect(screen.getByLabelText("Sort By")).toBeVisible()
  expect(screen.getByLabelText("Players")).toBeVisible()
  expect(screen.getByLabelText("Playtime")).toBeVisible()
})

it("Should display the badge count for active filters", () => {
  render(<FilterDrawer {...defaultProps} activeFilterCount={2} />)
  expect(screen.getByText("2")).toBeVisible()
})

it("Should not show badge when no filters are active", () => {
  render(<FilterDrawer {...defaultProps} activeFilterCount={0} />)
  expect(screen.queryByText("0")).not.toBeInTheDocument()
})
