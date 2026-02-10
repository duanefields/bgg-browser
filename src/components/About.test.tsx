import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import About from "./About"

describe("About", () => {
  it("should render the version string", () => {
    render(<About />)
    expect(screen.getByText(/About this Application/)).toBeVisible()
  })

  it("should render a reload button", () => {
    render(<About />)
    expect(screen.getByRole("button", { name: /reload/i })).toBeVisible()
  })
})
