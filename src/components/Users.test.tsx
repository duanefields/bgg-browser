import { screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { BGG_PROXY } from "../lib/api"
import { renderWithProviders } from "../lib/testUtils"

import pandyandy from "../test/users/pandyandy.json"
import dkf2112 from "../test/users/dkf2112.json"

import Users from "./Users"

const server = setupServer(
  http.get(`${BGG_PROXY}/user`, ({ request }) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("name")
    switch (username) {
      case "pandyandy":
        return HttpResponse.json(pandyandy)
      case "dkf2112":
        return HttpResponse.json(dkf2112)
    }
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("Should render the users with avatars and links", async () => {
  renderWithProviders(<Users usernames={["pandyandy", "dkf2112"]} />)

  // make sure we have two user links
  const userLinks = await screen.findAllByRole("link")
  expect(userLinks).toHaveLength(2)
  expect(userLinks[0]).toHaveTextContent("pandyandy")
  expect(userLinks[0]).toHaveAttribute("href", "/user/pandyandy")
  expect(userLinks[1]).toHaveTextContent("dkf2112")
  expect(userLinks[1]).toHaveAttribute("href", "/user/dkf2112")

  // make sure the Avatar component is rendering the image
  expect((await screen.findByAltText("pandyandy")).tagName).toBe("IMG")
  expect((await screen.findByAltText("dkf2112")).tagName).toBe("IMG")
})
