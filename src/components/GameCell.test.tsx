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
  numPlays: 10,
  rank: 100,
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
  myRating: 0,
  numPlays: 10,
  rank: 1007,
  objectId: 1,
  collectionId: 2,
  yearPublished: 2010,
  url: "https://example.com/ForbiddenIsland",
}

it("Should match snapshot", () => {
  const cell = render(<GameCell game={game} />)
  expect(cell).toMatchSnapshot()
})

it("Should render the game name", () => {
  render(<GameCell game={game} />)
  expect(screen.getByText("Forbidden Island")).toBeVisible()
})

it("Should render the thumbnail", () => {
  render(<GameCell game={game} />)
  expect(screen.getByAltText("Forbidden Island")).toBeVisible()
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

it("Should render the number of plays", () => {
  render(<GameCell game={game} />)
  expect(screen.getByText("10")).toBeVisible()
})

it("Should render the rank", () => {
  render(<GameCell game={game} />)
  expect(screen.getByText("100")).toBeVisible()
})

it("Should render the rank as a localized string", () => {
  render(<GameCell game={game2} />)
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
