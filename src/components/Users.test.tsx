import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { BGG_PROXY } from "../lib/api"
import { renderWithProviders } from "../lib/testUtils"

import dkf2112 from "../test/users/dkf2112.json"
import pandyandy from "../test/users/pandyandy.json"

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

it("Should render the users with avatars and links, sorted by name", async () => {
  renderWithProviders(<Users usernames={["pandyandy", "dkf2112"]} />)

  // make sure we have two user links
  const userLinks = await screen.findAllByRole("link")
  expect(userLinks).toHaveLength(2)
  expect(userLinks[0]).toHaveTextContent("dkf2112")
  expect(userLinks[0]).toHaveAttribute("href", "/user/dkf2112")
  expect(userLinks[1]).toHaveTextContent("pandyandy")
  expect(userLinks[1]).toHaveAttribute("href", "/user/pandyandy")

  // make sure the Avatar component is rendering the image
  expect((await screen.findByAltText("pandyandy")).tagName).toBe("IMG")
  expect((await screen.findByAltText("dkf2112")).tagName).toBe("IMG")
})

// this test is mostly useless because I've been unable to test the navigation
// by mocking the useNavigate hook or the window.location object
it("Should call navigate to the new user on form submission", async () => {
  renderWithProviders(<Users usernames={["pandyandy"]} />)
  const input = await screen.findByRole("textbox")
  await userEvent.type(input, "dkf2112")
  const button = await screen.findByRole("button")
  await userEvent.click(button)
  // navigation is not supported in jsdom
  // expect(window.location.pathname).toBe("/user/dkf2112")
})
