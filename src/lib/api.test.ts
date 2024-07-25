import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { beforeAll, afterAll, afterEach, expect, it, describe } from "vitest"

// sample collection responses
import singleCollection from "../test/collections/single.json"
import dkf2112Collection from "../test/collections/dkf2112.json"
import pandyandyCollection from "../test/collections/pandyandy.json"
import invalidUsernameCollection from "../test/collections/invalidUsername.json"

// sample user responses
import dkf2112 from "../test/users/dkf2112.json"
import pandyandy from "../test/users/pandyandy.json"
import AlexvW from "../test/users/AlexvW.json"
import invalidUsername from "../test/users/invalidUsername.json"

import { BGG_PROXY, getCollection, getUser } from "./api"

const server = setupServer(
  http.get(`${BGG_PROXY}/collection`, ({ request }) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("username")
    switch (username) {
      case "single":
        return HttpResponse.json(singleCollection)
      case "dkf2112":
        return HttpResponse.json(dkf2112Collection)
      case "pandyandy":
        return HttpResponse.json(pandyandyCollection)
      default:
        return HttpResponse.json(invalidUsernameCollection)
    }
  }),
  http.get(`${BGG_PROXY}/user`, ({ request }) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("name")
    switch (username) {
      case "dkf2112":
        return HttpResponse.json(dkf2112)
      case "pandyandy":
        return HttpResponse.json(pandyandy)
      case "AlexvW":
        return HttpResponse.json(AlexvW)
      default:
        return HttpResponse.json(invalidUsername)
    }
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("getUser", () => {
  it("Should return a user object", async () => {
    const user = await getUser("dkf2112")
    expect(user.username).toEqual("dkf2112")
    expect(user.avatar).toEqual("https://cf.geekdo-static.com/avatars/avatar_id95740.jpg")
    expect(user.firstName).toEqual("Duane")
    expect(user.lastName).toEqual("Fields")
    expect(user.userId).toEqual(673735)
  })

  it("Should return a null avatar for a user who has not set their avatar", async () => {
    const user = await getUser("AlexvW")
    expect(user.avatar).toBeNull()
  })

  it("Should return null names for a user who has not set their names", async () => {
    const user = await getUser("pandyandy")
    expect(user.firstName).toBeNull()
    expect(user.lastName).toBeNull()
  })

  it("Should return an error for an invalid username", async () => {
    await expect(getUser("nonexistent")).rejects.toThrow("Invalid username specified")
  })
})

describe("getCollection", () => {
  it("Should parse my entire collection without errors", async () => {
    const collection = await getCollection("dkf2112")
    expect(collection.length).toEqual(225)
  })

  it("Should return a single item for single", async () => {
    const collection = await getCollection("single")
    expect(collection.length).toEqual(1)
    const item = collection[0]
    expect(item.objectId).toEqual(128996)
    expect(item.collectionId).toEqual(34053222)
    expect(item.name).toEqual("1775: Rebellion")
    expect(item.yearPublished).toEqual(2013)
    expect(item.minPlayers).toEqual(2)
    expect(item.maxPlayers).toEqual(4)
    expect(item.minPlaytime).toEqual(60)
    expect(item.maxPlaytime).toEqual(120)
    expect(item.playtime).toEqual(120)
    expect(item.averageRating).toEqual(7.6)
    expect(item.numPlays).toEqual(3)
    expect(item.yearPublished).toEqual(2013)
    expect(item.thumbnail).toEqual(
      "https://cf.geekdo-images.com/rTKzRG0b8CtQWYqmCC353w__thumb/img/fivxQMJoJqReqc7c2yghuAFP9Uk=/fit-in/200x150/filters:strip_icc()/pic1386705.jpg",
    )
    expect(item.rank).toEqual(564)
    expect(item.myRating).toEqual(9)
    expect(item.url).toEqual("https://boardgamegeek.com/boardgame/128996/")
  })

  it("Should return an error for an invalid username", async () => {
    await expect(getCollection("nonexistent")).rejects.toThrow("Invalid username specified")
  })

  it("Should return null for myRating if the user has not rated the game", async () => {
    const collection = await getCollection("pandyandy")
    const game = collection.find((item) => item.collectionId === 96706548)
    expect(game!.myRating).toBeNull()
  })

  it("Should return null for ranking if the game is not ranked", async () => {
    const collection = await getCollection("dkf2112")
    const game = collection.find((item) => item.collectionId === 42625873)
    expect(game!.rank).toBeNull()
  })
})
