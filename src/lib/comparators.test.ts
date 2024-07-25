import { expect, test } from "vitest"
import {
  titleComparator,
  ratingComparator,
  myRatingComparator,
  playsComparator,
  rankComparator,
} from "./comparators"
import { Game } from "../shared.types"

// test titleComparator
test("titleComparator should sort titles ascending ignoring leading articles", () => {
  const titles = [
    "The Great Gatsby",
    "To Kill a Mockingbird",
    "1984",
    "An American Tragedy",
    "Brave New World",
    "The Catcher in the Rye",
    "A Tale of Two Cities",
  ]

  const games: Game[] = titles.map((title) => ({
    name: title,
    objectId: 0,
    collectionId: 0,
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

  const sorted = games.sort(titleComparator).map((game) => game.name)

  expect(sorted).toEqual([
    "1984",
    "An American Tragedy",
    "Brave New World",
    "The Catcher in the Rye",
    "The Great Gatsby",
    "A Tale of Two Cities",
    "To Kill a Mockingbird",
  ])
})

test("ratingComparator should sort by averageRating descending then title", () => {
  const data = [
    { name: "Game 1", averageRating: 7 },
    { name: "Game 2", averageRating: 8 },
    { name: "Game 3", averageRating: 6 },
    { name: "Game 4", averageRating: 8 },
    { name: "Game 5", averageRating: 7 },
  ]

  const games: Game[] = data.map((game) => ({
    ...game,
    objectId: 0,
    collectionId: 0,
    thumbnail: "",
    minPlayers: 0,
    maxPlayers: 0,
    minPlaytime: 0,
    maxPlaytime: 0,
    playtime: 0,
    yearPublished: 0,
    myRating: null,
    rank: null,
    numPlays: 0,
    url: "",
  }))

  const sorted = games.sort(ratingComparator).map((game) => ({
    name: game.name,
    averageRating: game.averageRating,
  }))

  expect(sorted).toEqual([
    { name: "Game 2", averageRating: 8 },
    { name: "Game 4", averageRating: 8 },
    { name: "Game 1", averageRating: 7 },
    { name: "Game 5", averageRating: 7 },
    { name: "Game 3", averageRating: 6 },
  ])
})

test("myRatingComparator should correctly sort by myRating descending then title", () => {
  const data = [
    { name: "Game 1", myRating: 7 },
    { name: "Game 2", myRating: 8 },
    { name: "Game 3", myRating: 6 },
    { name: "Game 4", myRating: 8 },
    { name: "Game 5", myRating: 7 },
    { name: "Game 6", myRating: null },
    { name: "Game 7", myRating: 5 },
  ]

  const games: Game[] = data.map((game) => ({
    ...game,
    objectId: 0,
    collectionId: 0,
    thumbnail: "",
    minPlayers: 0,
    maxPlayers: 0,
    minPlaytime: 0,
    maxPlaytime: 0,
    playtime: 0,
    yearPublished: 0,
    averageRating: 0,
    rank: null,
    numPlays: 0,
    url: "",
  }))

  const sorted = games.sort(myRatingComparator).map((game) => ({
    name: game.name,
    myRating: game.myRating,
  }))

  expect(sorted).toEqual([
    { name: "Game 2", myRating: 8 },
    { name: "Game 4", myRating: 8 },
    { name: "Game 1", myRating: 7 },
    { name: "Game 5", myRating: 7 },
    { name: "Game 3", myRating: 6 },
    { name: "Game 7", myRating: 5 },
    { name: "Game 6", myRating: null },
  ])
})

test("plays should correctly sort by numPlays descending then title", () => {
  const data = [
    { name: "Game 1", numPlays: 7 },
    { name: "Game 2", numPlays: 8 },
    { name: "Game 3", numPlays: 6 },
    { name: "Game 4", numPlays: 8 },
    { name: "Game 5", numPlays: 7 },
  ]

  const games: Game[] = data.map((game) => ({
    ...game,
    objectId: 0,
    collectionId: 0,
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
    url: "",
  }))

  const sorted = games.sort(playsComparator).map((game) => ({
    name: game.name,
    numPlays: game.numPlays,
  }))

  expect(sorted).toEqual([
    { name: "Game 2", numPlays: 8 },
    { name: "Game 4", numPlays: 8 },
    { name: "Game 1", numPlays: 7 },
    { name: "Game 5", numPlays: 7 },
    { name: "Game 3", numPlays: 6 },
  ])
})

test("rankComparator should correctly sort by rank ascending then title", () => {
  const data = [
    { name: "Game 1", rank: 7 },
    { name: "Game 2", rank: 8 },
    { name: "Game 3", rank: 6 },
    { name: "Game 4", rank: 8 },
    { name: "Game 5", rank: 7 },
    { name: "Game 6", rank: null },
    { name: "Game 7", rank: 5 },
    { name: "Game 8", rank: null },
  ]

  const games: Game[] = data.map((game) => ({
    ...game,
    objectId: 0,
    collectionId: 0,
    thumbnail: "",
    minPlayers: 0,
    maxPlayers: 0,
    minPlaytime: 0,
    maxPlaytime: 0,
    playtime: 0,
    yearPublished: 0,
    averageRating: 0,
    myRating: null,
    numPlays: 0,
    url: "",
  }))

  const sorted = games.sort(rankComparator).map((game) => ({
    name: game.name,
    rank: game.rank,
  }))

  expect(sorted).toEqual([
    { name: "Game 7", rank: 5 },
    { name: "Game 3", rank: 6 },
    { name: "Game 1", rank: 7 },
    { name: "Game 5", rank: 7 },
    { name: "Game 2", rank: 8 },
    { name: "Game 4", rank: 8 },
    { name: "Game 6", rank: null },
    { name: "Game 8", rank: null },
  ])
})
