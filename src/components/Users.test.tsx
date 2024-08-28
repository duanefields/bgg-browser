import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"
import { renderWithProviders } from "../lib/testUtils"

import Users from "./Users"

const USERNAMES_KEY = "usernames"

afterEach(() => {
  localStorage.clear()
})

describe("Users", () => {
  it("Should render the users with avatars and links, sorted by name", async () => {
    localStorage.setItem(USERNAMES_KEY, JSON.stringify(["pandyandy", "dkf2112"]))
    renderWithProviders(<Users />)

    // make sure we have two user links
    const userLinks = await screen.findAllByRole("link")
    expect(userLinks).toHaveLength(2)
    expect(userLinks[0]).toHaveAttribute("href", "/user/dkf2112")
    expect(userLinks[1]).toHaveAttribute("href", "/user/pandyandy")

    // make sure the Avatar component is rendering the image
    expect((await screen.findByAltText("pandyandy")).tagName).toBe("IMG")
    expect((await screen.findByAltText("dkf2112")).tagName).toBe("IMG")
  })

  it("Should call onUserAdded on form submission", async () => {
    localStorage.setItem(USERNAMES_KEY, JSON.stringify(["pandyandy"]))
    const user = userEvent.setup()
    const spy = vi.fn()
    renderWithProviders(<Users onUserAdded={spy} />)
    const input = await screen.findByRole("textbox")
    await user.type(input, "dkf2112")
    const button = await screen.findByRole("button", { name: "Browse Collection" })
    await user.click(button)
    expect(spy).toHaveBeenCalledWith("dkf2112")
  })

  it("Should add new usernames to local storage", async () => {
    localStorage.setItem(USERNAMES_KEY, JSON.stringify(["pandyandy"]))
    renderWithProviders(<Users />)
    const user = userEvent.setup()
    const input = await screen.findByRole("textbox")
    await user.type(input, "dkf2112")
    const button = await screen.findByRole("button", { name: "Browse Collection" })
    await user.click(button)
    const storedUsernames = JSON.parse(localStorage.getItem("usernames")!) as string[]
    expect(storedUsernames).toEqual(["pandyandy", "dkf2112"])
  })

  it("Should store not store duplicate usernames in local storage", async () => {
    localStorage.setItem(USERNAMES_KEY, JSON.stringify(["pandyandy", "dkf2112"]))
    renderWithProviders(<Users />)
    const user = userEvent.setup()
    const input = await screen.findByRole("textbox")
    await user.type(input, "dkf2112")
    const button = await screen.findByRole("button", { name: "Browse Collection" })
    await user.click(button)
    const storedUsernames = JSON.parse(localStorage.getItem("usernames")!) as string[]
    expect(storedUsernames).toEqual(["pandyandy", "dkf2112"])
  })

  it("Should disable autocomplete and autocorrect on the input field", async () => {
    renderWithProviders(<Users />)
    const input = await screen.findByRole("textbox")
    expect(input).toHaveAttribute("data-1p-ignore", "true")
    expect(input).toHaveAttribute("data-lpignore", "true")
    expect(input).toHaveAttribute("autoCorrect", "off")
    expect(input).toHaveAttribute("autoCapitalize", "off")
  })

  it("Should remove a user when the delete button is clicked", async () => {
    localStorage.setItem(USERNAMES_KEY, JSON.stringify(["dkf2112", "pandyandy"]))
    renderWithProviders(<Users />)
    const userLinksBefore = await screen.findAllByRole("link")
    expect(userLinksBefore).toHaveLength(2)

    const deleteButtons = await screen.findAllByLabelText("delete")
    const user = userEvent.setup()
    await user.click(deleteButtons[0])

    const userLinksAfter = await screen.findAllByRole("link")
    expect(userLinksAfter).toHaveLength(1)
    expect(userLinksAfter[0]).toHaveAttribute("href", "/user/pandyandy")
  })

  // it("Should disable the button and textbox while the form is submitting", async () => {
  //   renderWithProviders(<Users />)
  //   const user = userEvent.setup()
  //   const input = screen.getByRole("textbox")
  //   const button = screen.getByRole("button", { name: "Browse Collection" })
  //   await user.type(input, "dkf2112")
  //   await user.click(button)
  //   expect(input).toBeDisabled()
  //   expect(button).toBeDisabled()
  // })

  it("Should not store invalid users to local storage", async () => {
    localStorage.setItem(USERNAMES_KEY, JSON.stringify(["pandyandy", "dkf2112"]))
    renderWithProviders(<Users />)
    const user = userEvent.setup()
    const input = await screen.findByRole("textbox")
    await user.type(input, "invalidUsername")
    const button = await screen.findByRole("button", { name: "Browse Collection" })
    await user.click(button)
    const storedUsernames = JSON.parse(localStorage.getItem("usernames")!) as string[]
    expect(storedUsernames).toEqual(["pandyandy", "dkf2112"])
  })

  it("Should display an error message for invalid users", async () => {
    localStorage.setItem(USERNAMES_KEY, JSON.stringify(["pandyandy", "dkf2112"]))
    renderWithProviders(<Users />)
    const user = userEvent.setup()
    const input = await screen.findByRole("textbox")
    await user.type(input, "invalidUsername")
    const button = await screen.findByRole("button", { name: "Browse Collection" })
    await user.click(button)
    expect(await screen.findByText("Invalid username specified")).toBeVisible()
  })
})
