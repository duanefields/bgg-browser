import { useQuery } from "@tanstack/react-query"
import { getUser } from "../lib/api"

interface AvatarProps {
  /** The username of the avatar you want to load */
  username: string
}

const Avatar = ({ username }: AvatarProps) => {
  const query = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
  })

  return (
    <div>
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>Error: {query.error.message}</div>}
      {query.isSuccess && query.data?.avatar && (
        <div>
          <img src={query.data?.avatar} alt={username} />
        </div>
      )}
    </div>
  )
}

export default Avatar
