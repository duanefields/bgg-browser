import { expect, it, vi } from "vitest"
import { fireEvent, render, screen, within } from "@testing-library/react"
import SortMenu from "./SortMenu"

it("Should match snapshot", () => {
  const onChange = vi.fn()
  const view = render(<SortMenu sort="rating" onChange={onChange} />)
  expect(view).toMatchSnapshot()
})

it("Should render the label and the sort order", () => {
  const onChange = vi.fn()
  render(<SortMenu sort="rating" onChange={onChange} />)
  expect(screen.getByLabelText("Sort By")).toBeVisible()
  expect(screen.getByText("BGG Rating")).toBeVisible()
})

it("Should call the onChange function when the sort order changes", () => {
  const onChange = vi.fn()
  render(<SortMenu sort="rating" onChange={onChange} />)
  fireEvent.mouseDown(screen.getByRole("combobox"))
  const listbox = within(screen.getByRole("listbox"))
  fireEvent.click(listbox.getByText("Name"))
  expect(onChange).toHaveBeenCalledWith("name")
})
