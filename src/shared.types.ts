export type Game = {
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
