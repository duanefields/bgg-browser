import { render, screen } from "@testing-library/react"
import { afterEach, expect, it, vi } from "vitest"
import userEvent from "@testing-library/user-event"

import SearchBox from "./SearchBox"

const onChange = vi.fn()

afterEach(() => {
  onChange.mockReset()
})

it("Should match snapshot", () => {
  const view = render(<SearchBox searchText="test" onChange={onChange} />)
  expect(view).toMatchSnapshot()
})

it("Should match display search text", () => {
  render(<SearchBox searchText="test" onChange={onChange} />)
  expect(screen.getByDisplayValue("test")).toBeVisible()
})

it("Should display label text", () => {
  render(<SearchBox searchText="" onChange={onChange} />)
  expect(screen.getByLabelText("Filter by name")).toBeVisible()
})

it("Should call the onChange handler on text input", async () => {
  render(<SearchBox searchText="" onChange={onChange} />)
  const user = userEvent.setup()
  await user.type(screen.getByRole("searchbox"), "test")
  expect(onChange).toHaveBeenCalledTimes(4)
})
