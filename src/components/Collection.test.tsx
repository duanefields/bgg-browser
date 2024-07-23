import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { BGG_PROXY } from "../lib/api"
import invalidUsername from "../test/invalidUsername.json"
import pandyandy from "../test/pandyandy.json"

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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const renderWithQueryProvider = (children: React.ReactNode) => {
  return render(<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>)
}

it("Should render a loading state", async () => {
  renderWithQueryProvider(<Collection username="pandyandy" />)
  expect(screen.getByText("Loading...")).toBeVisible()
})

it("Should render an error state", async () => {
  renderWithQueryProvider(<Collection username="nonexistent" />)
  expect(await screen.findByText("Error: Invalid username specified")).toBeVisible()
})

it("Should render the collection", async () => {
  renderWithQueryProvider(<Collection username="pandyandy" />)
  expect(await screen.findByText("Forbidden Island")).toBeVisible()
})

it("Should match snapshot", async () => {
  const collection = renderWithQueryProvider(<Collection username="pandyandy" />)
  await screen.findByText("Forbidden Island")
  expect(collection).toMatchSnapshot()
})
