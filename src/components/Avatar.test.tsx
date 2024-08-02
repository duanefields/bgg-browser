import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { BGG_PROXY } from "../lib/api"

import invalidUsername from "../test/users/invalidUsername.json"
import pandyandy from "../test/users/pandyandy.json"
import AlexvW from "../test/users/AlexvW.json"

import Avatar from "./Avatar"

const server = setupServer(
  http.get(`${BGG_PROXY}/user`, ({ request }) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("name")
    switch (username) {
      case "pandyandy":
        return HttpResponse.json(pandyandy)
      case "AlexvW":
        return HttpResponse.json(AlexvW)
      default:
        return HttpResponse.json(invalidUsername)
    }
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// wrap the component in a fresh QueryClientProvider to isolate the tests
const renderWithQueryProvider = (children: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return render(<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>)
}

it("Should render the user's avatar image if they have one", async () => {
  renderWithQueryProvider(<Avatar username="pandyandy" />)
  const avatarElement = await screen.findByAltText("pandyandy")
  expect(avatarElement.tagName).toBe("IMG")
  expect(avatarElement).toHaveAttribute(
    "src",
    "https://cf.geekdo-static.com/avatars/avatar_id180271.jpg",
  )
  expect(avatarElement).toBeVisible()
})

it("Should render a default user icon if they don't have an avatar", async () => {
  renderWithQueryProvider(<Avatar username="AlexvW" />)
  const avatarElement = await screen.findByRole("img")
  expect(avatarElement.tagName).toBe("svg")
  expect(avatarElement).toHaveAttribute("data-icon", "user")
  expect(avatarElement).toBeVisible()
})

it("Should render a default user icon for an invalid username", async () => {
  renderWithQueryProvider(<Avatar username="invalidUsername" />)
  const avatarElement = await screen.findByRole("img")
  expect(avatarElement.tagName).toBe("svg")
  expect(avatarElement).toHaveAttribute("data-icon", "user")
  expect(avatarElement).toBeVisible()
})
