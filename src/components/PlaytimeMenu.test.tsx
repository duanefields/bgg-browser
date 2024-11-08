import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it, vi } from "vitest"

import PlaytimeMenu from "./PlaytimeMenu"

it("Should match snapshot", () => {
  const onChange = vi.fn()
  const view = render(<PlaytimeMenu playtime={30} onChange={onChange} />)
  expect(view).toMatchSnapshot()
})

it("Should render the label and the sort order", () => {
  const onChange = vi.fn()
  render(<PlaytimeMenu playtime={30} onChange={onChange} />)
  expect(screen.getByLabelText("Playtime")).toBeVisible()
  expect(screen.getByText("30 mins")).toBeVisible()
})

it("Should call the onChange function when the sort order changes", async () => {
  const onChange = vi.fn()
  render(<PlaytimeMenu playtime={30} onChange={onChange} />)
  const user = userEvent.setup()
  await user.click(screen.getByRole("combobox"))
  const listbox = within(screen.getByRole("listbox"))
  await user.click(listbox.getByText("60 mins"))
  expect(onChange).toHaveBeenCalledWith(60)
})
