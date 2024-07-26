import { expect, it, vi } from "vitest"
import { fireEvent, render, screen, within } from "@testing-library/react"
import PlayersMenu from "./PlayersMenu"

it("Should match snapshot", () => {
  const onChange = vi.fn()
  const cell = render(<PlayersMenu players={3} onChange={onChange} />)
  expect(cell).toMatchSnapshot()
})

it("Should render the label and the sort order", () => {
  const onChange = vi.fn()
  render(<PlayersMenu players={3} onChange={onChange} />)
  expect(screen.getByLabelText("Players")).toBeVisible()
  expect(screen.getByText("3 Players")).toBeVisible()
})

it("Should call the onChange function when the sort order changes", async () => {
  const onChange = vi.fn()
  const sort = render(<PlayersMenu players={3} onChange={onChange} />)
  fireEvent.mouseDown(sort.getByRole("combobox"))
  const listbox = within(sort.getByRole("listbox"))
  fireEvent.click(listbox.getByText("2 Players"))
  expect(onChange).toHaveBeenCalledWith(2)
})
