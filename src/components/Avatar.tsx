import { useQuery } from "@tanstack/react-query"
import { getUser } from "../lib/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

interface AvatarProps {
  /** The username of the avatar you want to load */
  username: string
}

const Avatar = ({ username }: AvatarProps) => {
  const query = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
  })

  // if the user doesn't have an avatar or there is an error, render a default icon
  if ((query.isSuccess && query.data?.avatar === null) || query.isError) {
    return (
      <FontAwesomeIcon
        icon={faUser}
        width={64}
        height={64}
        size="4x"
        title={username}
        titleId="1000"
      />
    )
  }

  return (
    <div>
      {query.isSuccess && query.data?.avatar && (
        <div>
          <img src={query.data?.avatar} alt={username} width={64} height={64} />
        </div>
      )}
    </div>
  )
}

export default Avatar
