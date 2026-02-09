import { useQuery } from "@tanstack/react-query"
import Fuse from "fuse.js"
import { useMemo } from "react"
import { getCollection } from "../lib/api"
import { Game, PlayerCount, Playtime, SortOrder } from "../shared.types"
import GameCell from "./GameCell"
import classes from "./Collection.module.css"
import {
  titleComparator,
  ratingComparator,
  myRatingComparator,
  playsComparator,
  rankComparator,
  playtimeComparator,
} from "../lib/comparators"
import { shuffle } from "../lib/utils"
import SkeletonGameCell from "./SkeletonGameCell"

type CollectionProps = {
  /** The username of the collection you want to load */
  username: string
  /** The search text to filter the collection */
  searchText: string
  /** The sort order to apply to the collection */
  sort: SortOrder
  /** The minimum number of players to filter the collection */
  players: PlayerCount
  /** The maximum playtime to filter the collection */
  playtime: Playtime
}

const Collection = ({ username, searchText, sort, players, playtime }: CollectionProps) => {
  const query = useQuery({
    queryKey: ["collection", username],
    queryFn: () => getCollection(username),
    retry: (failureCount, error) => {
      console.debug(`Error #${failureCount} fetching collection:`, error.message)
      return error.message === "Collection is being processed, try again later"
    },
  })

  // todo: is this the best way to handle undefined games?
  const emptyGames: Game[] = []
  const games = query.data ?? emptyGames

  // build the search index
  const index = useMemo(() => {
    console.debug(`Indexing ${games.length} games`)
    console.time("index")
    const fuse = new Fuse<Game>(games, { keys: ["name"], threshold: 0.3 })
    console.timeEnd("index")
    return fuse
  }, [games])

  // make a copy of the games list because we are going to be filtering and sorting it
  let results = [...games]

  // filter the list by the fuzzy search text
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

  // filter by the playtime
  if (playtime > 0) {
    results = results.filter((game) => {
      // if the max playtime is 0 or null, assume the game supports any playtime
      if (game.maxPlaytime === 0 || game.maxPlaytime === null) return true
      // otherwise, check if the playtime is less than or equal to the max playtime
      return playtime >= game.maxPlaytime
    })
  }

  // sort the list by the selected sort order
  console.debug(`Sorting ${results.length} games by ${sort}`)
  console.time("sort")
  switch (sort) {
    case "random":
      results = shuffle(results)
      break
    case "name":
      results.sort(titleComparator)
      break
    case "rating":
      results.sort(ratingComparator)
      break
    case "myRating":
      results.sort(myRatingComparator)
      break
    case "plays":
      results.sort(playsComparator)
      break
    case "rank":
      results.sort(rankComparator)
      break
    case "playtime":
      results.sort(playtimeComparator)
      break
  }
  console.timeEnd("sort")

  const collectionName = <h2 className={classes.collectionName}>{username}&apos;s Collection</h2>

  // show skeletons while loading
  if (query.isLoading) {
    const skeletons = Array.from({ length: 10 }, (_, i) => <SkeletonGameCell key={i} />)

    return (
      <div>
        {collectionName}
        <div className={classes.loading}>Loading...</div>
        <div className={classes.gameList}>{skeletons}</div>
      </div>
    )
  }

  return (
    <div>
      {collectionName}
      {query.isError && <div className={classes.error}>Error: {query.error.message}</div>}
      {query.isSuccess && (
        <div>
          <div className={classes.count}>
            Showing {results.length.toLocaleString()} of {games.length.toLocaleString()} games
          </div>
          <div className={classes.gameList}>
            {results?.map((game) => (
              <GameCell key={game.collectionId} game={game} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Collection
