import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { beforeAll, afterAll, afterEach, expect, it, describe } from "vitest"

import { getUserById, SERVER, BGG_PROXY, getCollection } from "./api"
import data1775 from "../test/1775.json"
import dkf2112 from "../test/dkf2112.json"

const server = setupServer(
  http.get(`${SERVER}/users/1`, () => {
    return HttpResponse.json({ name: "Duane Fields", id: 1 })
  }),
  http.get(`${SERVER}/users/2`, () => {
    return HttpResponse.json({ name: "Joe Blow", id: 2 })
  }),
  http.get(`${BGG_PROXY}/collection`, ({ request }) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("username")
    if (username === "1775") {
      return HttpResponse.json(data1775)
    }
    if (username === "dkf2112") {
      return HttpResponse.json(dkf2112)
    }
    return new HttpResponse(null, { status: 404 })
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("getUserById", () => {
  it("Should return full JSON response 1", async () => {
    const user = await getUserById(1)
    expect(user).toEqual({ name: "Duane Fields", id: 1 })
  })

  it("Should return full JSON response 2", async () => {
    const user = await getUserById(2)
    expect(user).toEqual({ name: "Joe Blow", id: 2 })
  })
})

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
})
