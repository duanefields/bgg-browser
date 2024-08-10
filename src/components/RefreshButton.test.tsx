import * as reactQuery from "@tanstack/react-query"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, expect, it, vi } from "vitest"
import { renderWithQueryProvider } from "../lib/testUtils"

import RefreshButton from "./RefreshButton"

const mockInvalidateQueries = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
})

it("Should match snapshot", () => {
  vi.spyOn(reactQuery, "useIsFetching").mockReturnValue(1)
  const view = renderWithQueryProvider(<RefreshButton username="test" />)
  expect(view).toMatchSnapshot()
})

it("Should render a refresh button", () => {
  renderWithQueryProvider(<RefreshButton username="test" />)
  expect(screen.getByRole("button")).toBeVisible()
})

it("Should spin the icon when fetching", async () => {
  const mockUseIsFetching = vi.spyOn(reactQuery, "useIsFetching").mockReturnValue(1)
  renderWithQueryProvider(<RefreshButton username="test" />)
  expect(mockUseIsFetching).toHaveBeenCalledOnce()
  expect(await screen.findByRole("img", { hidden: true })).toHaveClass("fa-spin")
})

it("Should not spin the icon when not fetching", async () => {
  const mockUseIsFetching = vi.spyOn(reactQuery, "useIsFetching").mockReturnValue(0)
  renderWithQueryProvider(<RefreshButton username="test" />)
  expect(mockUseIsFetching).toHaveBeenCalledOnce()
  expect(await screen.findByRole("img", { hidden: true })).not.toHaveClass("fa-spin")
})

it("Should call the queryClient.invalidateQueries function when clicked", async () => {
  vi.mock("@tanstack/react-query", async () => {
    const reactQuery = await vi.importActual("@tanstack/react-query")
    return { ...reactQuery, useQueryClient: () => ({ invalidateQueries: mockInvalidateQueries }) }
  })
  renderWithQueryProvider(<RefreshButton username="test" />)
  const user = userEvent.setup()
  await user.click(screen.getByRole("button"))
  expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ["collection", "test"] })
})
