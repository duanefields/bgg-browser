import { describe, expect, it } from "vitest"
import makeGame from "./makeGame"
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
    const games = [
      "The Great Gatsby",
      "To Kill a Mockingbird",
      "1984",
      "An American Tragedy",
      "Brave New World",
      "The Catcher in the Rye",
      "A Tale of Two Cities",
    ].map((name) => makeGame({ name }))

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

  it("Should handle case-insensitive article stripping", () => {
    const games = [
      "the castles of burgundy",
      "THE GAME",
      "a feast for odin",
      "AN UNEXPECTED JOURNEY",
    ].map((name) => makeGame({ name }))

    const sorted = games.sort(titleComparator).map((game) => game.name)

    expect(sorted).toEqual([
      "the castles of burgundy",
      "a feast for odin",
      "THE GAME",
      "AN UNEXPECTED JOURNEY",
    ])
  })

  it("Should not strip articles that are part of the first word", () => {
    const games = [
      "Ark Nova",
      "Anthem",
      "Thebes",
      "Anaconda",
    ].map((name) => makeGame({ name }))

    const sorted = games.sort(titleComparator).map((game) => game.name)

    // "A" in "Ark" and "Anthem" should NOT be stripped because they aren't
    // a standalone article followed by a space
    expect(sorted).toEqual(["Anaconda", "Anthem", "Ark Nova", "Thebes"])
  })

  it("Should not strip 'a' when it is the entire title", () => {
    const games = [
      "B",
      "A",
      "C",
    ].map((name) => makeGame({ name }))

    const sorted = games.sort(titleComparator).map((game) => game.name)

    // "A" has no trailing space so the regex /^a /i should not match
    expect(sorted).toEqual(["A", "B", "C"])
  })
})

describe("ratingComparator", () => {
  it("Should sort by averageRating descending then title", () => {
    const games = [
      makeGame({ name: "Game 1", averageRating: 7 }),
      makeGame({ name: "Game 2", averageRating: 8 }),
      makeGame({ name: "Game 3", averageRating: 6 }),
      makeGame({ name: "Game 4", averageRating: 8 }),
      makeGame({ name: "Game 5", averageRating: 7 }),
    ]

    const sorted = games.sort(ratingComparator).map((g) => ({
      name: g.name,
      averageRating: g.averageRating,
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
  it("Should correctly sort by myRating descending then title", () => {
    const games = [
      makeGame({ name: "Game 1", myRating: 7 }),
      makeGame({ name: "Game 2", myRating: 8 }),
      makeGame({ name: "Game 3", myRating: 6 }),
      makeGame({ name: "Game 4", myRating: 8 }),
      makeGame({ name: "Game 5", myRating: 7 }),
      makeGame({ name: "Game 6", myRating: null }),
      makeGame({ name: "Game 7", myRating: 5 }),
    ]

    const sorted = games.sort(myRatingComparator).map((g) => ({
      name: g.name,
      myRating: g.myRating,
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
    const games = [
      makeGame({ name: "Game 1", numPlays: 7 }),
      makeGame({ name: "Game 2", numPlays: 8 }),
      makeGame({ name: "Game 3", numPlays: 6 }),
      makeGame({ name: "Game 4", numPlays: 8 }),
      makeGame({ name: "Game 5", numPlays: 7 }),
    ]

    const sorted = games.sort(playsComparator).map((g) => ({
      name: g.name,
      numPlays: g.numPlays,
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
    const games = [
      makeGame({ name: "Game 1", rank: 7 }),
      makeGame({ name: "Game 2", rank: 8 }),
      makeGame({ name: "Game 3", rank: 6 }),
      makeGame({ name: "Game 4", rank: 8 }),
      makeGame({ name: "Game 5", rank: 7 }),
      makeGame({ name: "Game 6", rank: null }),
      makeGame({ name: "Game 7", rank: 5 }),
      makeGame({ name: "Game 8", rank: null }),
    ]

    const sorted = games.sort(rankComparator).map((g) => ({
      name: g.name,
      rank: g.rank,
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
    const games = [
      makeGame({ name: "Game 1", maxPlaytime: 120 }),
      makeGame({ name: "Game 2", maxPlaytime: 90 }),
      makeGame({ name: "Game 3", maxPlaytime: 180 }),
      makeGame({ name: "Game 4", maxPlaytime: 60 }),
      makeGame({ name: "Game 5", maxPlaytime: 120 }),
      makeGame({ name: "Game 6", maxPlaytime: 90 }),
      makeGame({ name: "Game 7", maxPlaytime: 180 }),
      makeGame({ name: "Game 8", maxPlaytime: 60 }),
      makeGame({ name: "Game 9", maxPlaytime: null }),
      makeGame({ name: "Game A", maxPlaytime: null }),
    ]

    const sorted = games.sort(playtimeComparator).map((g) => ({
      name: g.name,
      maxPlaytime: g.maxPlaytime,
    }))

    expect(sorted).toEqual([
      { name: "Game 9", maxPlaytime: null },
      { name: "Game A", maxPlaytime: null },
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
