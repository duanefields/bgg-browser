import { screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it, vi } from "vitest"
import { BGG_PROXY } from "../lib/api"
import { renderWithQueryProvider } from "../lib/testUtils"
import * as api from "../lib/api"

import invalidUsername from "../test/collections/invalidUsername.json"
import pandyandy from "../test/collections/pandyandy.json"
import accepted from "../test/collections/accepted.json"

import Collection from "./Collection"
import { Game } from "../shared.types"

const server = setupServer(
  http.get(`${BGG_PROXY}/collection`, ({ request }) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("username")
    switch (username) {
      case "pandyandy":
        return HttpResponse.json(pandyandy)
      case "invalidUser":
        return HttpResponse.json(invalidUsername)
    }
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("Should render a loading state", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="name" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Loading...")).toBeVisible()
})

it("Should render an error state", async () => {
  renderWithQueryProvider(
    <Collection username="invalidUser" sort="name" players={0} playtime={0} />,
  )
  expect(await screen.findByText("Error: Invalid username specified")).toBeVisible()
})

it("Should render the full collection", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="name" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Showing 7 of 7 games")).toBeVisible()
  expect(screen.getByText("Forbidden Island")).toBeVisible()
  expect(screen.getByText("Dixit")).toBeVisible()
  expect(screen.getByText("Dixit: Journey")).toBeVisible()
  expect(screen.getByText("Pandemic")).toBeVisible()
  expect(screen.getByText("The Resistance")).toBeVisible()
  expect(screen.getByText("Skull")).toBeVisible()
  expect(screen.getByText("Tsuro of the Seas")).toBeVisible()
})

it("Should render a filtered collection", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" searchText="dixit" sort="name" players={0} playtime={0} />,
  )
  expect(await screen.findByText("Showing 2 of 7 games")).toBeVisible()
  expect(screen.getByText("Dixit")).toBeVisible()
  expect(screen.getByText("Dixit: Journey")).toBeVisible()
})

it("Should fuzzy match when searching by name", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" searchText="turo" sort="name" players={0} playtime={0} />,
  )
  expect(await screen.findByText("Showing 1 of 7 games")).toBeVisible()
  expect(screen.getByText("Tsuro of the Seas")).toBeVisible()
})

it("Should render a sorted collection by name", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="name" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Showing 7 of 7 games")).toBeVisible()
  const games = screen.getAllByTestId("game")
  expect(games[0]).toHaveTextContent("Dixit")
})

it("Should render a sorted collection by rating", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="rating" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Showing 7 of 7 games")).toBeVisible()
  const games = screen.getAllByTestId("game")
  expect(games[0]).toHaveTextContent("Pandemic")
})

it("Should render a sorted collection by myRating", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="myRating" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Showing 7 of 7 games")).toBeVisible()
  const games = screen.getAllByTestId("game")
  expect(games[0]).toHaveTextContent("Pandemic")
})

it("Should render a sorted collection by plays", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="plays" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Showing 7 of 7 games")).toBeVisible()
  const games = screen.getAllByTestId("game")
  expect(games[0]).toHaveTextContent("Skull")
})

it("Should render a sorted collection by rank", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="rank" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Showing 7 of 7 games")).toBeVisible()
  const games = screen.getAllByTestId("game")
  expect(games[0]).toHaveTextContent("Pandemic")
})

it("Should render a sorted collection by random", async () => {
  vi.spyOn(Math, "random").mockReturnValue(0.5)
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="random" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Showing 7 of 7 games")).toBeVisible()
  const games = screen.getAllByTestId("game")
  expect(games[0]).toHaveTextContent("Dixit")
  vi.spyOn(Math, "random").mockRestore()
})

it("Should render a collection filtered by player count", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="rank" players={10} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Showing 1 of 7 games")).toBeVisible()
  const games = screen.getAllByTestId("game")
  expect(games.length).toBe(1)
  expect(games[0]).toHaveTextContent("The Resistance")
})

it("Should render a collection filtered by playtime", async () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="rank" players={0} playtime={30} searchText="" />,
  )
  expect(await screen.findByText("Showing 4 of 7 games")).toBeVisible()
  const games = screen.getAllByTestId("game")
  expect(games.length).toBe(4)
  expect(games[0]).toHaveTextContent("Dixit")
})

it("Should render the collection count as a localized string", async () => {
  const games: Game[] = Array.from({ length: 1001 }, (_, i) => ({
    name: `Game ${i}`,
    objectId: i,
    collectionId: i,
    thumbnail: "",
    minPlayers: 0,
    maxPlayers: 0,
    minPlaytime: 0,
    maxPlaytime: 0,
    playtime: 0,
    yearPublished: 0,
    averageRating: 0,
    myRating: null,
    rank: null,
    numPlays: 0,
    url: "",
  }))

  const spy = vi.spyOn(api, "getCollection").mockResolvedValue(games)
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="name" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Showing 1,001 of 1,001 games")).toBeVisible()
  expect(spy).toHaveBeenCalledOnce()
  expect(spy).toHaveResolvedWith(games)
  vi.restoreAllMocks()
})

it("Should retry fetching the collection on accepted error", async () => {
  // prepend a handler to the server that will return an invalid user error
  server.use(
    http.get(
      `${BGG_PROXY}/collection`,
      () => {
        return HttpResponse.json(accepted, { status: 202 })
      },
      { once: true },
    ),
  )

  renderWithQueryProvider(
    <Collection username="pandyandy" sort="name" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Showing 7 of 7 games", {}, { timeout: 2000 })).toBeVisible()
})

it("Should not retry fetching the collection on invalid user error", async () => {
  renderWithQueryProvider(
    <Collection username="invalidUser" sort="name" players={0} playtime={0} searchText="" />,
  )
  expect(await screen.findByText("Error: Invalid username specified")).toBeVisible()
})

it("Should show skeletons while loading", () => {
  renderWithQueryProvider(
    <Collection username="pandyandy" sort="name" players={0} playtime={0} searchText="" />,
  )
  expect(screen.getAllByTestId("skeleton")).toHaveLength(4)
})
