import { Game } from "../shared.types"

/** Root URL of the BGG Proxy Server */
const BGG_PROXY: string = import.meta.env.VITE_BGG_PROXY

type RankResponse = {
  _type: string
  _id: string
  _name: string
  _friendlyname: string
  _value: string
  _bayesaverage: string
}

type ItemResponse = {
  _objectid: number
  name: {
    _sortindex: string
    __text: string
  }
  yearpublished: string
  image: string
  thumbnail: string
  stats: {
    _minplayers: string
    _maxplayers: string
    _minplaytime: string
    _maxplaytime: string
    _playingtime: string
    _numowned: string
    rating: {
      usersrated: {
        _value: string
      }
      average: {
        _value: string
      }
      bayesaverage: {
        _value: string
      }
      stddev: {
        _value: string
      }
      median: {
        _value: string
      }
      ranks: {
        rank: RankResponse[] | { _value: string }
        _value: string
      }
    }
  }
  status: {
    _own: string
    _prevowned: string
    _fortrade: string
    _want: string
    _wanttoplay: string
    _wanttobuy: string
    _wishlist: string
    _preordered: string
    _lastmodified: string
  }
  numplays: string
  _objecttype: string
  _subtype: string
  _collid: string
}

type CollectionResponse = {
  items: {
    item: ItemResponse[]
  }
  _totalitems: string
  _termsofuse: string
  _pubdate: string
}

const getCollection = async (username: string): Promise<Game[]> => {
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
    rank: Number(rankForItem(item)),
    numPlays: Number(item.numplays),
  }))
}

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
