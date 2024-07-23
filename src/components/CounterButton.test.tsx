import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"

import CounterButton from "./CounterButton"

it("Should set the initial count to 0", () => {
  render(<CounterButton />)
  expect(screen.getByText("count is 0")).toBeVisible()
})

it("Should increment the count when the button is clicked", async () => {
  render(<CounterButton />)
  const button = screen.getByRole("button")
  expect(screen.getByText("count is 0")).toBeVisible()
  await userEvent.click(button)
  expect(screen.getByText("count is 1")).toBeVisible()
})
