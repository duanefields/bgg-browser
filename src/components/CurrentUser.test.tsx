import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { SERVER } from "../lib/api"

import CurrentUser from "./CurrentUser"

const server = setupServer(
  http.get(`${SERVER}/users/1`, () => {
    return HttpResponse.json({ name: "Duane Fields" })
  }),
)

const queryClient = new QueryClient()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("Should display not logged in by default", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <CurrentUser />
    </QueryClientProvider>,
  )
  expect(screen.getByText("Not logged in")).toBeVisible()
})

it("Should display the user's name when logged in", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <CurrentUser />
    </QueryClientProvider>,
  )
  expect(await screen.findByText("Logged in as Duane Fields")).toBeVisible()
})

it("Should match snapshot", async () => {
  const currentUser = render(
    <QueryClientProvider client={queryClient}>
      <CurrentUser />
    </QueryClientProvider>,
  )
  await screen.findByText("Logged in as Duane Fields")
  expect(currentUser).toMatchSnapshot()
})
