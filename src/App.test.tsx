import { render, screen } from "@testing-library/react"
import { expect, it } from "vitest"

import App from "./App"

it("Should render the App component", () => {
  render(<App />)
  expect(screen.getByText("BGG Collection Browser")).toBeVisible()
})
