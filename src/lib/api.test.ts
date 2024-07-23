import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { beforeAll, afterAll, afterEach, expect, it, describe } from "vitest"

import { BGG_PROXY, getCollection } from "./api"
import data1775 from "../test/1775.json"
import dkf2112 from "../test/dkf2112.json"
import invalidUsername from "../test/invalidUsername.json"

const server = setupServer(
  http.get(`${BGG_PROXY}/collection`, ({ request }) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("username")
    switch (username) {
      case "1775":
        return HttpResponse.json(data1775)
      case "dkf2112":
        return HttpResponse.json(dkf2112)
      default:
        return HttpResponse.json(invalidUsername)
    }
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("getCollection", () => {
  it("Should parse my entire collection without errors", async () => {
    const collection = await getCollection("dkf2112")
    expect(collection.length).toEqual(225)
  })

  it("Should return a single item for 1775", async () => {
    const collection = await getCollection("1775")
    expect(collection.length).toEqual(1)
    const item = collection[0]
    expect(item.objectId).toEqual(128996)
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
    // todo: rank
  })

  it("Should return an error for an invalid username", async () => {
    await expect(getCollection("nonexistent")).rejects.toThrow("Invalid username specified")
  })
})
