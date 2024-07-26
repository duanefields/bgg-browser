import { describe, expect, it } from "vitest"
import { shuffle } from "./utils"
import { Game } from "../shared.types"

describe("shuffle", () => {
  it("Should randomize the order of an array", () => {
    const games: Game[] = Array.from({ length: 100 }, (_, i) => ({
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

    const shuffled = shuffle(games)
    expect(shuffled).not.toEqual(games)
    expect(shuffled).toHaveLength(games.length)
    expect(shuffled).toEqual(expect.arrayContaining(games))
  })
})
