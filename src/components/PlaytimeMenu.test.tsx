import { expect, it, vi } from "vitest"
import { fireEvent, render, screen, within } from "@testing-library/react"
import PlaytimeMenu from "./PlaytimeMenu"

it("Should match snapshot", () => {
  const onChange = vi.fn()
  const cell = render(<PlaytimeMenu playtime={30} onChange={onChange} />)
  expect(cell).toMatchSnapshot()
})

it("Should render the label and the sort order", () => {
  const onChange = vi.fn()
  render(<PlaytimeMenu playtime={30} onChange={onChange} />)
  expect(screen.getByLabelText("Playtime")).toBeVisible()
  expect(screen.getByText("30m")).toBeVisible()
})

it("Should call the onChange function when the sort order changes", async () => {
  const onChange = vi.fn()
  const playtime = render(<PlaytimeMenu playtime={30} onChange={onChange} />)
  fireEvent.mouseDown(playtime.getByRole("combobox"))
  const listbox = within(playtime.getByRole("listbox"))
  fireEvent.click(listbox.getByText("60m"))
  expect(onChange).toHaveBeenCalledWith(60)
})
