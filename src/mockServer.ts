import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { BGG_PROXY } from "./lib/api"

// sample collection responses
import acceptedCollection from "./test/collections/accepted.json"
import dkf2112Collection from "./test/collections/dkf2112.json"
import invalidUsernameCollection from "./test/collections/invalidUsername.json"
import oddballsCollection from "./test/collections/oddballs.json"
import pandyandyCollection from "./test/collections/pandyandy.json"
import singleCollection from "./test/collections/single.json"
import tommyCollection from "./test/collections/tommy.json"

// sample user responses
import AlexvW from "./test/users/AlexvW.json"
import dkf2112 from "./test/users/dkf2112.json"
import invalidUsername from "./test/users/invalidUsername.json"
import pandyandy from "./test/users/pandyandy.json"

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
      case "oddballs":
        return HttpResponse.json(oddballsCollection)
      case "accepted":
        return HttpResponse.json(acceptedCollection, { status: 202 })
      case "tommy":
        return HttpResponse.json(tommyCollection)
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

export default server
