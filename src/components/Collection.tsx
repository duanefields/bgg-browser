import { useQuery } from "@tanstack/react-query"
import { getCollection } from "../lib/api"

type CollectionProps = {
  /** The username of the collection you want to load */
  username: string
}

const Collection = ({ username }: CollectionProps) => {
  const query = useQuery({
    queryKey: ["collection", username],
    queryFn: () => getCollection(username),
  })

  return (
    <div>
      <h2>{username}'s Collection</h2>
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>Error: {query.error.message}</div>}
      {query.isSuccess && (
        <div>
          {query.data?.map((game) => (
            <div key={game.objectId}>
              <h3>{game.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Collection
