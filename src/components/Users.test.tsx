import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"
import { renderWithProviders } from "../lib/testUtils"

import Users from "./Users"

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
  // todo: figure out how to test navigation, clicking the button leaves the dom in a weird state
  // and breaks the next test
  // const button = await screen.findByRole("button")
  // await userEvent.click(button)
  // navigation is not supported in jsdom
  // expect(window.location.pathname).toBe("/user/dkf2112")
})

it("Should disable autocomplete and autocorrect on the input field", async () => {
  renderWithProviders(<Users usernames={["pandyandy"]} />)
  const input = await screen.findByRole("textbox")
  expect(input).toHaveAttribute("data-1p-ignore", "true")
  expect(input).toHaveAttribute("data-lpignore", "true")
  expect(input).toHaveAttribute("autoCorrect", "off")
  expect(input).toHaveAttribute("autoCapitalize", "off")
})
