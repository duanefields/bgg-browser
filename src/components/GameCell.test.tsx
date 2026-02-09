import { render, screen } from "@testing-library/react"
import { expect, it, vi } from "vitest"
import { Game } from "../shared.types"

import GameCell from "./GameCell"

const game: Game = {
  name: "Forbidden Island",
  thumbnail: "https://example.com/forbidden-island.jpg",
  minPlayers: 2,
  maxPlayers: 4,
  minPlaytime: 30,
  maxPlaytime: 45,
  playtime: 45,
  averageRating: 6.8,
  myRating: 8,
  numPlays: 1001,
  rank: 1007,
  objectId: 1,
  collectionId: 2,
  yearPublished: 2010,
  url: "https://example.com/ForbiddenIsland",
}

const game2: Game = {
  name: "Forbidden Island",
  thumbnail: "https://example.com/forbidden-island.jpg",
  minPlayers: 2,
  maxPlayers: 2,
  minPlaytime: 30,
  maxPlaytime: 30,
  playtime: 45,
  averageRating: 6.8,
  myRating: null,
  numPlays: 10,
  rank: null,
  objectId: 1,
  collectionId: 2,
  yearPublished: 2010,
  url: "https://example.com/ForbiddenIsland",
}

const game3: Game = {
  name: "Forbidden Island",
  thumbnail: "https://example.com/forbidden-island.jpg",
  minPlayers: 2,
  maxPlayers: 2,
  minPlaytime: null,
  maxPlaytime: null,
  playtime: null,
  averageRating: 6.8,
  myRating: null,
  numPlays: 10,
  rank: null,
  objectId: 1,
  collectionId: 2,
  yearPublished: 2010,
  url: "https://example.com/ForbiddenIsland",
}

it("Should match snapshot", () => {
  const view = render(<GameCell game={game} />)
  expect(view).toMatchSnapshot()
})

it("Should render the game name", () => {
  render(<GameCell game={game} />)
  expect(screen.getByText("Forbidden Island")).toBeVisible()
})

it("Should render the thumbnail", () => {
  render(<GameCell game={game} />)
  const image = screen.getByAltText("Forbidden Island")
  expect(image).toHaveAttribute("src", "https://example.com/forbidden-island.jpg")
  expect(image).toBeVisible()
})

it("Should render the player count", () => {
  render(<GameCell game={game} />)
  expect(screen.getByText("2-4")).toBeVisible()
})

it("Should render the player count if min and max are the same", () => {
  render(<GameCell game={game2} />)
  expect(screen.getByText("2")).toBeVisible()
})

it("Should render the playtime as range", () => {
  render(<GameCell game={game} />)
  expect(screen.getByText("30-45 mins")).toBeVisible()
})

it("Should render the playtime if min and max are the same", () => {
  render(<GameCell game={game2} />)
  expect(screen.getByText("45 mins")).toBeVisible()
})

it("Should render the average rating and user rating", () => {
  render(<GameCell game={game} />)
  expect(screen.getByText("6.8 (8)")).toBeVisible()
})

it("Should render the average rating only if no user rating", () => {
  render(<GameCell game={game2} />)
  expect(screen.getByText("6.8")).toBeVisible()
})

it("Should render the number of plays as a localized string", () => {
  render(<GameCell game={game} />)
  expect(screen.getByText("1,001")).toBeVisible()
})

it("Should render the rank as a localized string", () => {
  render(<GameCell game={game} />)
  expect(screen.getByText("1,007")).toBeVisible()
})

it("Should open the game URL in a new tab", () => {
  const winOpen = window.open
  window.open = vi.fn()
  render(<GameCell game={game} />)
  screen.getByText("Forbidden Island").click()
  expect(window.open).toHaveBeenCalledWith("https://example.com/ForbiddenIsland", "_blank")
  window.open = winOpen
})

it("Should render no text for the ranking if none is present", async () => {
  render(<GameCell game={game2} />)
  const element = await screen.findByTestId("rank")
  expect(element.textContent?.trim()).toEqual("")
})

it("Should render no text for the playtime if none is present", async () => {
  render(<GameCell game={game3} />)
  const element = await screen.findByTestId("playtime")
  expect(element.textContent?.trim()).toEqual("")
})
