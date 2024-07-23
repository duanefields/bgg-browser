import { useQuery } from "@tanstack/react-query"
import { getCollection } from "../lib/api"

const Collection = () => {
  const username = "dkf2112"
  const query = useQuery({
    queryKey: ["collection", username],
    queryFn: () => getCollection(username),
  })
  return (
    <div>
      <h1>{username}'s Collection</h1>
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>Error: {query.error.message}</div>}
      {query.isSuccess && (
        <div>
          {query.data?.map((game) => (
            <div key={game.objectId}>
              <h2>{game.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Collection
