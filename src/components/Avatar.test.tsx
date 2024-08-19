import { screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { describe, expect, it } from "vitest"
import { BGG_PROXY } from "../lib/api"
import { renderWithQueryProvider } from "../lib/testUtils"
import server from "../mockServer"

import invalidUsername from "../test/users/invalidUsername.json"

import Avatar from "./Avatar"

describe("Avatar", () => {
  it("Should match snapshot for image", async () => {
    const view = renderWithQueryProvider(<Avatar username="dkf2112" size={64} />)
    await screen.findByTitle("Duane Fields")
    expect(view).toMatchSnapshot()
  })

  it("Should match snapshot for initials", async () => {
    const view = renderWithQueryProvider(<Avatar username="AlexvW" size={64} />)
    await screen.findByTitle("Alex van Wijngaarden")
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

  it("Should render initials if they don't have an avatar", async () => {
    renderWithQueryProvider(<Avatar username="AlexvW" />)
    const avatarElement = await screen.findByTitle("Alex van Wijngaarden")
    expect(avatarElement).toHaveTextContent("AV")
    expect(avatarElement).toBeVisible()
  })

  it("Should render a skeleton while loading", () => {
    renderWithQueryProvider(<Avatar username="AlexvW" />)
    const avatarElement = screen.getByTestId("skeleton")
    expect(avatarElement).toBeVisible()
  })

  it("Should render username initial for an invalid username", async () => {
    renderWithQueryProvider(<Avatar username="invalidUsername" />)
    const avatarElement = await screen.findByTitle("invalidUsername")
    expect(avatarElement).toHaveTextContent("I")
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

  it("Should render the user's name as the title on the initials if they have it set", async () => {
    renderWithQueryProvider(<Avatar username="AlexvW" />)
    const avatarElement = await screen.findByTitle("Alex van Wijngaarden")
    expect(avatarElement).toBeVisible()
  })

  it("Should render the user's name as the title on the image if they have it set", async () => {
    renderWithQueryProvider(<Avatar username="dkf2112" />)
    const avatarElement = await screen.findByTitle("Duane Fields")
    expect(avatarElement).toBeVisible()
  })

  it("Should render the username as the title on the icon if the user has no name set", async () => {
    renderWithQueryProvider(<Avatar username="pandyandy" />)
    const avatarElement = await screen.findByTitle("pandyandy")
    expect(avatarElement).toBeVisible()
  })

  it("Should render the username as the alt text on the image", async () => {
    renderWithQueryProvider(<Avatar username="dkf2112" />)
    const avatarElement = await screen.findByAltText("dkf2112")
    expect(avatarElement).toBeVisible()
  })
})
