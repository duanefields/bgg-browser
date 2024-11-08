import { Game, User } from "../shared.types"
import {
  BGGCollectionResponse,
  CollectionProcessingResponse,
  InvalidUsernameResponse,
  ItemResponse,
  UserResponse,
} from "./bgg.types"

/** Root URL of the BGG Proxy Server */
export const BGG_PROXY: string = import.meta.env.VITE_BGG_PROXY as string

/**
 * Fetch a user by their username
 * @param username user to fetch
 * @returns User object
 */
export const getUser = async (username: string): Promise<User> => {
  console.debug(`Fetching user ${username}`)
  const response = await fetch(
    `${BGG_PROXY}/user?` + new URLSearchParams({ name: username }).toString(),
  )
  const json = (await response.json()) as UserResponse

  // If the user does not exist, the server responds with a 200 OK and an HTML error page
  // that is returned as JSON (thanks to the proxy server?)
  if (!json.user) {
    throw new Error("Invalid username specified")
  }

  // Not all users have all their data filled out
  const avatar = json.user.avatarlink._value != "N/A" ? json.user.avatarlink._value : null
  const firstName = json.user.firstname._value || null
  const lastName = json.user.lastname._value || null

  return {
    username: json.user._name,
    userId: Number(json.user._id),
    avatar: avatar,
    firstName: firstName,
    lastName: lastName,
  }
}

/**
 * Fetch a user's collection by their username
 * @param username user to fetch collection for
 * @returns Array of Game objects
 */
export const getCollection = async (username: string): Promise<Game[]> => {
  console.debug(`Fetching collection for ${username}`)
  const response = await fetch(
    `${BGG_PROXY}/collection?` +
      new URLSearchParams({
        username: username,
        stats: "1",
        own: "1",
        version: "1",
        excludesubtype: "boardgameexpansion",
      }).toString(),
  )
  const json = (await response.json()) as BGGCollectionResponse

  // Check for invalid user, the server responds with a 200 OK even if there is an error
  if (isInvalidUsername(json)) {
    throw new Error(json.errors.error.message)
  }

  // The server responds with a 202 Accepted if the collection is being processed
  if (isCollectionProcessing(json)) {
    throw new Error("Collection is being processed, try again later")
  }

  // If the user has no games in their collection, it does not return an empty array
  if (!json.items.item) {
    return []
  }

  return json.items.item.map((item) => ({
    objectId: Number(item._objectid),
    collectionId: Number(item._collid),
    name: item.name.__text,
    thumbnail: item.thumbnail,
    minPlayers: Number(item.stats._minplayers) || 1,
    maxPlayers: Number(item.stats._maxplayers) || 1,
    minPlaytime: Number(item.stats._minplaytime) || null,
    maxPlaytime: Number(item.stats._maxplaytime) || null,
    playtime: Number(item.stats._playingtime) || null,
    yearPublished: Number(item.yearpublished),
    averageRating: Number(Number(item.stats.rating.average._value).toFixed(1)),
    myRating: Number(item.stats.rating._value) || null,
    rank: Number(rankForItem(item)) || null,
    numPlays: Number(item.numplays),
    url: `https://boardgamegeek.com/${item._subtype}/${item._objectid}/`,
  }))
}

const isInvalidUsername = (
  response: BGGCollectionResponse,
): response is InvalidUsernameResponse => {
  return "errors" in response
}

const isCollectionProcessing = (
  response: BGGCollectionResponse,
): response is CollectionProcessingResponse => {
  return "message" in response
}

// Helper function to get the rank for an item, because the data is inconsistent
// If the rank is an array, find the rank for boardgames, otherwise return the rank
// Some items are ranked in more than one category, for example wargames or family games
const rankForItem = (item: ItemResponse) => {
  if (Array.isArray(item.stats.rating.ranks.rank)) {
    return item.stats.rating.ranks.rank.find((r) => {
      return r._name === "boardgame"
    })!._value
  } else {
    return item.stats.rating.ranks.rank._value
  }
}
