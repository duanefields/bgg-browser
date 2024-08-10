import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it, vi } from "vitest"

import PlayersMenu from "./PlayersMenu"

it("Should match snapshot", () => {
  const onChange = vi.fn()
  const view = render(<PlayersMenu players={3} onChange={onChange} />)
  expect(view).toMatchSnapshot()
})

it("Should render the label and the sort order", () => {
  const onChange = vi.fn()
  render(<PlayersMenu players={3} onChange={onChange} />)
  expect(screen.getByLabelText("Players")).toBeVisible()
  expect(screen.getByText("3 Players")).toBeVisible()
})

it("Should call the onChange function when the sort order changes", async () => {
  const onChange = vi.fn()
  render(<PlayersMenu players={3} onChange={onChange} />)
  const user = userEvent.setup()
  await user.click(screen.getByRole("combobox"))
  const listbox = within(screen.getByRole("listbox"))
  await user.click(listbox.getByText("2 Players"))
  expect(onChange).toHaveBeenCalledWith(2)
})
