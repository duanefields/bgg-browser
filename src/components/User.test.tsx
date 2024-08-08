import { screen } from "@testing-library/react"
import { expect, it } from "vitest"
import { renderWithQueryProvider } from "../lib/testUtils"

import User from "./User"

it("Should render the User component at all", async () => {
  renderWithQueryProvider(<User username="pandyandy" />)
  expect(await screen.findByText("pandyandy's Collection")).toBeVisible()
})
