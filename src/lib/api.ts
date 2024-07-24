import { Game } from "../shared.types"
import { CollectionResponse, ItemResponse } from "./bgg.types"

/** Root URL of the BGG Proxy Server */
const BGG_PROXY: string = import.meta.env.VITE_BGG_PROXY

const getCollection = async (username: string): Promise<Game[]> => {
  console.debug(`Fetching collection for ${username}`)
  const response = await fetch(
    `${BGG_PROXY}/collection/?username=${username}&stats=1&own=1&version=1&excludesubtype=boardgameexpansion`,
  )

  // Check for errors, the server responds with a 200 OK even if there is an error
  const json = await response.json()
  if (json.errors) {
    throw new Error(json.errors.error.message)
  }

  const data = json as CollectionResponse
  return data.items.item.map((item) => ({
    objectId: Number(item._objectid),
    name: item.name.__text,
    thumbnail: item.thumbnail,
    minPlayers: Number(item.stats._minplayers),
    maxPlayers: Number(item.stats._maxplayers),
    minPlaytime: Number(item.stats._minplaytime),
    maxPlaytime: Number(item.stats._maxplaytime),
    playtime: Number(item.stats._playingtime),
    yearPublished: Number(item.yearpublished),
    averageRating: Number(Number(item.stats.rating.average._value).toFixed(1)),
    myRating: Number(item.stats.rating._value) || 0,
    rank: Number(rankForItem(item)),
    numPlays: Number(item.numplays),
  }))
}

// Helper function to get the rank for an item
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

export { getCollection, BGG_PROXY }
