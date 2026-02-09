import { describe, expect, it } from "vitest"
import { validateSearch } from "../shared.types"


describe("validateSearch", () => {
  it("Should return defaults when no search params are provided", () => {
    expect(validateSearch({})).toEqual({ sort: "name", players: 0, playtime: 0 })
  })

  it("Should pass through valid search params", () => {
    expect(validateSearch({ sort: "rating", players: "4", playtime: "60" })).toEqual({
      sort: "rating",
      players: 4,
      playtime: 60,
    })
  })

  it("Should fall back to defaults for invalid sort values", () => {
    expect(validateSearch({ sort: "invalid" })).toEqual({ sort: "name", players: 0, playtime: 0 })
  })

  it("Should fall back to defaults for invalid player counts", () => {
    expect(validateSearch({ players: "99" })).toEqual({ sort: "name", players: 0, playtime: 0 })
    expect(validateSearch({ players: "-1" })).toEqual({ sort: "name", players: 0, playtime: 0 })
    expect(validateSearch({ players: "abc" })).toEqual({ sort: "name", players: 0, playtime: 0 })
  })

  it("Should fall back to defaults for invalid playtime values", () => {
    expect(validateSearch({ playtime: "999" })).toEqual({ sort: "name", players: 0, playtime: 0 })
    expect(validateSearch({ playtime: "abc" })).toEqual({ sort: "name", players: 0, playtime: 0 })
    expect(validateSearch({ playtime: "42" })).toEqual({ sort: "name", players: 0, playtime: 0 })
  })

  it("Should accept all valid sort orders", () => {
    const validSorts = ["name", "rating", "myRating", "plays", "rank", "playtime", "random"]
    validSorts.forEach((sort) => {
      expect(validateSearch({ sort })).toMatchObject({ sort })
    })
  })

  it("Should accept all valid player counts", () => {
    for (let i = 0; i <= 12; i++) {
      expect(validateSearch({ players: String(i) })).toMatchObject({ players: i })
    }
  })

  it("Should accept all valid playtime values", () => {
    const validPlaytimes = [0, 15, 30, 45, 60, 90, 120, 150, 180]
    validPlaytimes.forEach((playtime) => {
      expect(validateSearch({ playtime: String(playtime) })).toMatchObject({ playtime })
    })
  })
})
