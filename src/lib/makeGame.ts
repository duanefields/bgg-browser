import { Game } from "../shared.types"

/** Create a Game object with sensible defaults, overriding any fields as needed. */
const makeGame = (overrides: Partial<Game> = {}): Game => ({
  objectId: 1,
  collectionId: 1,
  name: "Test Game",
  thumbnail: "",
  minPlayers: 2,
  maxPlayers: 4,
  minPlaytime: 30,
  maxPlaytime: 60,
  playtime: 45,
  yearPublished: 2020,
  averageRating: 7.0,
  myRating: null,
  rank: null,
  numPlays: 0,
  url: "",
  ...overrides,
})

export default makeGame
