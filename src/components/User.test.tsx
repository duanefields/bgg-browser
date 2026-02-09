import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRootRoute, createRoute, createRouter, RouterProvider, stripSearchParams } from "@tanstack/react-router"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { UserSearch, validateSearch } from "../shared.types"

import User from "./User"

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// Default to desktop so inline filters render for existing tests
beforeEach(() => mockMatchMedia(true))
afterEach(() => vi.restoreAllMocks())

const renderUserWithRouter = (username: string, search?: UserSearch) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  const rootRoute = createRootRoute()
  const userRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/user/$username",
    validateSearch,
    search: {
      middlewares: [stripSearchParams({ sort: "name", players: 0, playtime: 0 })],
    },
    component: () => (
      <QueryClientProvider client={queryClient}>
        <User username={username} />
      </QueryClientProvider>
    ),
  })

  const router = createRouter({
    routeTree: rootRoute.addChildren([userRoute]),
  })

  void router.navigate({ to: "/user/$username", params: { username }, search })

  return { ...render(<RouterProvider router={router} />), router }
}

it("Should render the User component at all", async () => {
  renderUserWithRouter("pandyandy")
  expect(await screen.findByText("pandyandy's Collection")).toBeVisible()
})

describe("query string state", () => {
  it("Should render with default filter values when no search params are provided", async () => {
    renderUserWithRouter("pandyandy")
    expect(await screen.findByText("Name")).toBeVisible()
    expect(screen.getByLabelText("Players")).toHaveTextContent("Any")
    expect(screen.getByLabelText("Playtime")).toHaveTextContent("Any")
  })

  it("Should initialize filters from search params", async () => {
    renderUserWithRouter("pandyandy", { sort: "rating", players: 4, playtime: 60 })
    expect(await screen.findByText("BGG Rating")).toBeVisible()
    expect(screen.getByText("4 Players")).toBeVisible()
    expect(screen.getByText("60 mins")).toBeVisible()
  })

  it("Should update the URL when changing the sort order", async () => {
    const { router } = renderUserWithRouter("pandyandy")
    await screen.findByText("pandyandy's Collection")

    const user = userEvent.setup()
    await user.click(screen.getByLabelText("Sort By"))
    const listbox = within(screen.getByRole("listbox"))
    await user.click(listbox.getByText("BGG Rating"))

    expect(router.state.location.search).toMatchObject({ sort: "rating" })
  })

  it("Should update the URL when changing the player count", async () => {
    const { router } = renderUserWithRouter("pandyandy")
    await screen.findByText("pandyandy's Collection")

    const user = userEvent.setup()
    await user.click(screen.getByLabelText("Players"))
    const listbox = within(screen.getByRole("listbox"))
    await user.click(listbox.getByText("4 Players"))

    expect(router.state.location.search).toMatchObject({ players: 4 })
  })

  it("Should update the URL when changing the playtime", async () => {
    const { router } = renderUserWithRouter("pandyandy")
    await screen.findByText("pandyandy's Collection")

    const user = userEvent.setup()
    await user.click(screen.getByLabelText("Playtime"))
    const listbox = within(screen.getByRole("listbox"))
    await user.click(listbox.getByText("60 mins"))

    expect(router.state.location.search).toMatchObject({ playtime: 60 })
  })

  it("Should strip default values from the URL", async () => {
    const { router } = renderUserWithRouter("pandyandy", { sort: "rating", players: 4 })
    await screen.findByText("pandyandy's Collection")

    // Change sort back to default
    const user = userEvent.setup()
    await user.click(screen.getByLabelText("Sort By"))
    const listbox = within(screen.getByRole("listbox"))
    await user.click(listbox.getByText("Name"))

    expect(router.state.location.search.sort).toBeUndefined()
    // players should still be present
    expect(router.state.location.search).toMatchObject({ players: 4 })
  })

  it("Should preserve other search params when changing a filter", async () => {
    const { router } = renderUserWithRouter("pandyandy", { sort: "rating", players: 4 })
    await screen.findByText("pandyandy's Collection")

    const user = userEvent.setup()
    await user.click(screen.getByLabelText("Playtime"))
    const listbox = within(screen.getByRole("listbox"))
    await user.click(listbox.getByText("60 mins"))

    expect(router.state.location.search).toMatchObject({ sort: "rating", players: 4, playtime: 60 })
  })
})

describe("responsive layout", () => {
  it("Should show inline filters on desktop", async () => {
    mockMatchMedia(true)
    renderUserWithRouter("pandyandy")
    await screen.findByText("pandyandy's Collection")
    expect(screen.getByLabelText("Sort By")).toBeVisible()
    expect(screen.queryByRole("button", { name: /open filters/i })).not.toBeInTheDocument()
  })

  it("Should show filter button on mobile", async () => {
    mockMatchMedia(false)
    renderUserWithRouter("pandyandy")
    await screen.findByText("pandyandy's Collection")
    expect(screen.getByRole("button", { name: /open filters/i })).toBeVisible()
    expect(screen.queryByLabelText("Sort By")).not.toBeInTheDocument()
  })
})
