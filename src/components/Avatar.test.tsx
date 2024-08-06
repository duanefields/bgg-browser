import { screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { BGG_PROXY } from "../lib/api"
import { renderWithQueryProvider } from "../lib/testUtils"

import AlexvW from "../test/users/AlexvW.json"
import invalidUsername from "../test/users/invalidUsername.json"
import pandyandy from "../test/users/pandyandy.json"
import dkf2112 from "../test/users/dkf2112.json"

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
      case "dkf2112":
        return HttpResponse.json(dkf2112)
      case "invalidUsername":
        return HttpResponse.json(invalidUsername)
    }
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("Should match snapshot for image", async () => {
  const view = renderWithQueryProvider(<Avatar username="dkf2112" size={64} />)
  await screen.findByTitle("Duane Fields")
  expect(view).toMatchSnapshot()
})

it("Should match snapshot for icon", async () => {
  const view = renderWithQueryProvider(<Avatar username="AlexvW" size={64} />)
  await screen.findByRole("img")
  expect(view).toMatchSnapshot()
})

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

it("Should render a default user icon in initial loading state", () => {
  renderWithQueryProvider(<Avatar username="AlexvW" />)
  const avatarElement = screen.getByRole("img")
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

it("Should not retry the user fetch on invalid user error", () => {
  // prepend a handler to the server that will return an invalid user error
  server.use(
    http.get(
      `${BGG_PROXY}/user`,
      () => {
        return HttpResponse.json(invalidUsername)
      },
      { once: true },
    ),
  )

  renderWithQueryProvider(<Avatar username="pandyandy" />)
  // use `queryBy` to avoid throwing an error with `getBy`
  expect(screen.queryByAltText("pandyandy")).not.toBeInTheDocument()
})

it("Should render the user's name as the title on the icon if they have it set", async () => {
  renderWithQueryProvider(<Avatar username="AlexvW" />)
  const avatarElement = await screen.findByTitle("Alex van Wijngaarden")
  expect(avatarElement).toBeInTheDocument()
})

it("Should render the user's name as the title on the image if they have it set", async () => {
  renderWithQueryProvider(<Avatar username="dkf2112" />)
  const avatarElement = await screen.findByTitle("Duane Fields")
  expect(avatarElement).toBeInTheDocument()
})

it("Should render the username as the title on the icon if the user has no name set", async () => {
  renderWithQueryProvider(<Avatar username="pandyandy" />)
  const avatarElement = await screen.findByTitle("pandyandy")
  expect(avatarElement).toBeInTheDocument()
})

it("Should render the user's avatar image at the specified size", async () => {
  renderWithQueryProvider(<Avatar username="pandyandy" size={40} />)
  const avatarElement = await screen.findByAltText("pandyandy")
  expect(avatarElement.tagName).toBe("IMG")
  expect(avatarElement).toHaveAttribute("height", "40")
  expect(avatarElement).toHaveAttribute("width", "40")
})

it("Should render the user's avatar icon at the specified size", () => {
  renderWithQueryProvider(<Avatar username="AlexvW" size={40} />)
  const avatarElement = screen.getByRole("img")
  expect(avatarElement.tagName).toBe("svg")
  expect(avatarElement).toHaveAttribute("height", "40")
  expect(avatarElement).toHaveAttribute("width", "40")
  expect(avatarElement).toHaveAttribute("style", "font-size: 40px;")
})
