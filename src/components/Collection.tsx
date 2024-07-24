import { useQuery } from "@tanstack/react-query"
import Fuse from "fuse.js"
import { useMemo } from "react"
import { getCollection } from "../lib/api"
import { Game } from "../shared.types"
import GameCell from "./GameCell"

interface CollectionProps {
  /** The username of the collection you want to load */
  username: string
  /** The search text to filter the collection */
  searchText?: string
}

const Collection = ({ username, searchText }: CollectionProps) => {
  const query = useQuery({
    queryKey: ["collection", username],
    queryFn: () => getCollection(username),
  })

  // todo: hacky way to handle undefined games
  const emptyGames: Game[] = []
  const games = query.data || emptyGames

  // build the search index
  const index = useMemo(() => {
    console.debug(`Building search index for ${games.length} games`)
    return new Fuse<Game>(games, { keys: ["name"], threshold: 0.3 })
  }, [games])

  // filter the list
  let results = games
  if (searchText) {
    results = index.search(searchText).map((result) => result.item)
  }

  return (
    <div>
      <h2>{username}'s Collection</h2>
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>Error: {query.error.message}</div>}
      {query.isSuccess && (
        <div>
          <div>
            Showing {results.length} of {games.length} games
          </div>
          {results?.map((game) => (
            <div key={game.objectId}>
              <GameCell game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Collection
