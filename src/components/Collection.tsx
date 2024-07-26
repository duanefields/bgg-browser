import { useQuery } from "@tanstack/react-query"
import Fuse from "fuse.js"
import { useMemo } from "react"
import { getCollection } from "../lib/api"
import { Game, PlayerCount, SortOrder } from "../shared.types"
import GameCell from "./GameCell"
import {
  titleComparator,
  ratingComparator,
  myRatingComparator,
  playsComparator,
  rankComparator,
} from "../lib/comparators"
import { shuffle } from "../lib/utils"

interface CollectionProps {
  /** The username of the collection you want to load */
  username: string
  /** The search text to filter the collection */
  searchText?: string
  sort: SortOrder
  players: PlayerCount
}

const Collection = ({ username, searchText, sort, players }: CollectionProps) => {
  const query = useQuery({
    queryKey: ["collection", username],
    queryFn: () => getCollection(username),
  })

  // todo: is this a hacky way to handle undefined games?
  const emptyGames: Game[] = []
  const games = query.data || emptyGames

  // build the search index
  const index = useMemo(() => {
    console.debug(`Building search index for ${games.length} games`)
    return new Fuse<Game>(games, { keys: ["name"], threshold: 0.3 })
  }, [games])

  // filter the list by the fuzzy search text
  let results = games
  if (searchText) {
    results = index.search(searchText).map((result) => result.item)
  }

  // filter the list by the number of players
  if (players > 0) {
    results = results.filter((game) => {
      // if the min or max players is 0, then the game supports any number of players
      if (game.minPlayers === 0 || game.maxPlayers === 0) return true
      // otherwise, check if the player count is within the min/max range
      return players >= game.minPlayers && players <= game.maxPlayers
    })
  }

  // sort the list by the selected sort order
  console.debug("Sorting by", sort)
  if (sort === "random") {
    results = shuffle(results)
  } else {
    results.sort((a, b) => {
      switch (sort) {
        case "name":
          return titleComparator(a, b)
        case "rating":
          return ratingComparator(a, b)
        case "myRating":
          return myRatingComparator(a, b)
        case "plays":
          return playsComparator(a, b)
        case "rank":
          return rankComparator(a, b)
      }
    })
  }

  return (
    <div>
      <h2>{username}'s Collection</h2>
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>Error: {query.error.message}</div>}
      {query.isSuccess && (
        <div>
          <div>
            Showing {results.length.toLocaleString()} of {games.length.toLocaleString()} games
          </div>
          {results?.map((game) => (
            <div key={game.collectionId}>
              <GameCell game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Collection
