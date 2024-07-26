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

export type SortOrder = "name" | "rating" | "myRating" | "plays" | "rank" | "random"

export type PlayerCount = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type Playtime = 0 | 15 | 30 | 45 | 60 | 90 | 120 | 150 | 180
