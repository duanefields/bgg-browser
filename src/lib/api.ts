/** Root URL of the API Server */
const SERVER: string = import.meta.env.VITE_SERVER

/** Root URL of the BGG Proxy Server */
const BGG_PROXY: string = import.meta.env.VITE_BGG_PROXY

/** User type */
type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

/**
 * Get user by id
 * @param id the id of the user
 * @returns a promise of the user
 */
const getUserById = async (id: number): Promise<User> => {
  const response = await fetch(`${SERVER}/users/${id}`)
  return await response.json()
}

type CollectionResponse = {
  items: {
    item: {
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
            rank: {
              _type: string
              _id: string
              _name: string
              _friendlyname: string
              _value: string
              _bayesaverage: string
            }[]
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
    }[]
  }
  _totalitems: string
  _termsofuse: string
  _pubdate: string
}

type Game = {
  objectId: number
  name: string
  thumbnail: string
  minPlayers: number
  maxPlayers: number
  minPlaytime: number
  maxPlaytime: number
  playtime: number
  yearPublished: number
  averageRating: number
  // rank: number
  numPlays: number
}

const getCollection = async (username: string): Promise<Game[]> => {
  const response = await fetch(
    `${BGG_PROXY}/collection/?username=${username}&stats=1&own=1&version=1&excludesubtype=boardgameexpansion`,
  )
  const data = (await response.json()) as CollectionResponse
  return data.items.item.map((item) => ({
    objectId: Number(item._objectid),
    name: item.name.__text,
    thumbnail: item.thumbnail,
    minPlayers: Number(item.stats._minplayers || 0),
    maxPlayers: Number(item.stats._maxplayers || 0),
    minPlaytime: Number(item.stats._minplaytime || 0),
    maxPlaytime: Number(item.stats._maxplaytime || 0),
    playtime: Number(item.stats._playingtime || 0),
    yearPublished: Number(item.yearpublished),
    averageRating: Number(Number(item.stats.rating.average._value || 0).toFixed(1)),
    // rank: item.stats.rank,
    numPlays: Number(item.numplays),
  }))
}

export { getUserById, getCollection, SERVER, BGG_PROXY }
