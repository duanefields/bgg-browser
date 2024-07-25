import { Game } from "../shared.types"

/** sort by name ascending, ignoring leading articles a, an, and the */
export const titleComparator = (a: Game, b: Game) => {
  const aTitle = a.name.replace(/^(a|an|the) /i, "")
  const bTitle = b.name.replace(/^(a|an|the) /i, "")
  return aTitle.localeCompare(bTitle)
}

/** sort by averageRating descending, then by title */
export const ratingComparator = (a: Game, b: Game) => {
  return b.averageRating - a.averageRating || titleComparator(a, b)
}

/** sort by myRating descending, then by title */
export const myRatingComparator = (a: Game, b: Game) => {
  return (b.myRating || 0) - (a.myRating || 0) || titleComparator(a, b)
}

/** sort by numPlays descending, then by title */
export const playsComparator = (a: Game, b: Game) => {
  return b.numPlays - a.numPlays || titleComparator(a, b)
}

/** sort by rank ascending, then by title (though rank should be unique) */
export const rankComparator = (a: Game, b: Game) => {
  return (
    (a.rank || Number.MAX_SAFE_INTEGER) - (b.rank || Number.MAX_SAFE_INTEGER) ||
    titleComparator(a, b)
  )
}
