import { describe, expect, it } from "vitest"
import { Game } from "../shared.types"
import {
  myRatingComparator,
  playsComparator,
  playtimeComparator,
  rankComparator,
  ratingComparator,
  titleComparator,
} from "./comparators"

describe("titleComparator", () => {
  it("Should sort titles ascending ignoring leading articles", () => {
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
})

describe("ratingComparator", () => {
  it("Should sort by averageRating descending then title", () => {
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
})

describe("myRatingComparator", () => {
  it("Should should correctly sort by myRating descending then title", () => {
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
})

describe("playsComparator", () => {
  it("Should correctly sort by numPlays descending then title", () => {
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
})

describe("rankComparator", () => {
  it("Should correctly sort by rank ascending then title", () => {
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
})

describe("playtimeComparator", () => {
  it("Should sort by playtime ascending then title", () => {
    const data = [
      { name: "Game 1", maxPlaytime: 120 },
      { name: "Game 2", maxPlaytime: 90 },
      { name: "Game 3", maxPlaytime: 180 },
      { name: "Game 4", maxPlaytime: 60 },
      { name: "Game 5", maxPlaytime: 120 },
      { name: "Game 6", maxPlaytime: 90 },
      { name: "Game 7", maxPlaytime: 180 },
      { name: "Game 8", maxPlaytime: 60 },
    ]

    const games: Game[] = data.map((game) => ({
      ...game,
      objectId: 0,
      collectionId: 0,
      thumbnail: "",
      minPlayers: 0,
      maxPlayers: 0,
      minPlaytime: 0,
      playtime: 0,
      yearPublished: 0,
      averageRating: 0,
      myRating: null,
      rank: null,
      numPlays: 0,
      url: "",
    }))

    const sorted = games.sort(playtimeComparator).map((game) => ({
      name: game.name,
      maxPlaytime: game.maxPlaytime,
    }))

    expect(sorted).toEqual([
      { name: "Game 4", maxPlaytime: 60 },
      { name: "Game 8", maxPlaytime: 60 },
      { name: "Game 2", maxPlaytime: 90 },
      { name: "Game 6", maxPlaytime: 90 },
      { name: "Game 1", maxPlaytime: 120 },
      { name: "Game 5", maxPlaytime: 120 },
      { name: "Game 3", maxPlaytime: 180 },
      { name: "Game 7", maxPlaytime: 180 },
    ])
  })
})
