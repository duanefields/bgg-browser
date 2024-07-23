import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { BGG_PROXY } from "../lib/api"
import pandyandy from "../test/pandyandy.json"
import invalidUsername from "../test/invalidUsername.json"

import Collection from "./Collection"

const server = setupServer(
  http.get(`${BGG_PROXY}/collection`, ({ request }) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("username")
    switch (username) {
      case "pandyandy":
        return HttpResponse.json(pandyandy)
      default:
        return HttpResponse.json(invalidUsername)
    }
  }),
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("Should render a loading state", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Collection username="pandyandy" />
    </QueryClientProvider>,
  )
  expect(screen.getByText("Loading...")).toBeVisible()
})

it("Should render an error state", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Collection username="nonexistent" />
    </QueryClientProvider>,
  )
  expect(await screen.findByText("Error: Invalid username specified")).toBeVisible()
})

it("Should render the collection", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Collection username="pandyandy" />
    </QueryClientProvider>,
  )
  expect(await screen.findByText("Forbidden Island")).toBeVisible()
})
