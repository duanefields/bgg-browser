import { screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { BGG_PROXY } from "../lib/api"
import { renderWithQueryProvider } from "../lib/testUtils"

import pandyandy from "../test/collections/pandyandy.json"
import pandyandyAvatar from "../test/users/pandyandy.json"

import User from "./User"

const server = setupServer(
  http.get(`${BGG_PROXY}/collection`, ({ request }) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("username")
    switch (username) {
      case "pandyandy":
        return HttpResponse.json(pandyandy)
    }
  }),
  http.get(`${BGG_PROXY}/user`, ({ request }) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("name")
    switch (username) {
      case "pandyandy":
        return HttpResponse.json(pandyandyAvatar)
    }
  }),
)

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("Should render the User component at all", async () => {
  renderWithQueryProvider(<User username="pandyandy" />)
  expect(await screen.findByText("pandyandy's Collection")).toBeVisible()
})
