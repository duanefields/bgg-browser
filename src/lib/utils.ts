import { Game } from "../shared.types"

/** Randomly shuffle an array of games */
export const shuffle = (games: Game[]) => {
  return games
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
