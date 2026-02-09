export type Game = {
  /** The product ID, not guaranteed to be unique to the collection */
  objectId: number
  /** A unique ID for the item within the collection */
  collectionId: number
  name: string
  thumbnail: string
  minPlayers: number
  maxPlayers: number
  minPlaytime: number | null
  maxPlaytime: number | null
  playtime: number | null
  yearPublished: number
  averageRating: number
  myRating: number | null
  rank: number | null
  numPlays: number
  url: string
}

export type User = {
  username: string
  userId: number
  avatar: string | null
  firstName: string | null
  lastName: string | null
}

export const SORT_ORDERS = ["name", "rating", "myRating", "plays", "rank", "playtime", "random"] as const
export type SortOrder = (typeof SORT_ORDERS)[number]

export const PLAYER_COUNTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
export type PlayerCount = (typeof PLAYER_COUNTS)[number]

export const PLAYTIMES = [0, 15, 30, 45, 60, 90, 120, 150, 180] as const
export type Playtime = (typeof PLAYTIMES)[number]

export type UserSearch = {
  sort?: SortOrder
  players?: PlayerCount
  playtime?: Playtime
}

export const validateSearch = (search: Record<string, unknown>): UserSearch => {
  const sort = SORT_ORDERS.includes(search.sort as SortOrder) ? (search.sort as SortOrder) : "name"
  const players = Number(search.players)
  const playtime = Number(search.playtime)
  return {
    sort,
    players: PLAYER_COUNTS.includes(players as PlayerCount) ? (players as PlayerCount) : 0,
    playtime: PLAYTIMES.includes(playtime as Playtime) ? (playtime as Playtime) : 0,
  }
}
