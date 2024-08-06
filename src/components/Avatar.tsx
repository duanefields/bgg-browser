import { useQuery } from "@tanstack/react-query"
import { getUser } from "../lib/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import classes from "./Avatar.module.css"

interface AvatarProps {
  /** The username of the avatar you want to load */
  username: string
}

const Avatar = ({ username }: AvatarProps) => {
  const query = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
    retry: (failureCount, error) => {
      console.debug(`Error #${failureCount} fetching user:`, error.message)
      return error.message !== "Invalid username specified"
    },
  })

  // not everyone has there name set, so use the username as a fallback
  let title = username
  if (query.isSuccess && query.data?.firstName && query.data?.lastName) {
    title = `${query.data.firstName} ${query.data.lastName}`
  }

  // if the user doesn't have an avatar or there is an error, render a default icon
  if ((query.isSuccess && query.data?.avatar === null) || query.isError || query.isLoading) {
    return (
      <FontAwesomeIcon
        icon={faUser}
        width={64}
        height={64}
        size="4x"
        title={title}
        titleId="1000" // this is to ensure snapshots are consistent
        className={classes.avatar}
      />
    )
  }

  return (
    <div>
      {query.isSuccess && query.data?.avatar && (
        <img
          className={classes.avatar}
          src={query.data?.avatar}
          alt={username}
          title={title}
          width={64}
          height={64}
        />
      )}
    </div>
  )
}

export default Avatar
