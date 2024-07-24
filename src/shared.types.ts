export type Game = {
  /** The product ID, not guaranteed to be unique to the collection */
  objectId: number
  /** A unique ID for the item within the collection */
  collectionId: number
  name: string
  thumbnail: string
  minPlayers: number
  maxPlayers: number
  minPlaytime: number
  maxPlaytime: number
  playtime: number
  yearPublished: number
  averageRating: number
  myRating: number
  rank: number
  numPlays: number
}

export type User = {
  username: string
  avatar: string | null
  firstName: string | null
  lastName: string | null
}
