import { Avatar as MUIAvatar, Skeleton } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "../lib/api"
import classes from "./Avatar.module.css"

type AvatarProps = {
  /** The username of the avatar you want to load */
  username: string
  /** The size of the avatar in pixels */
  size?: number
}

const Avatar = ({ username, size = 40 }: AvatarProps) => {
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
  let initials = username[0]
  if (query.isSuccess && query.data?.firstName && query.data?.lastName) {
    title = `${query.data.firstName} ${query.data.lastName}`
    initials = `${query.data.firstName[0]}${query.data.lastName[0]}`
  }

  // render a skeleton while loading
  if (query.isLoading) {
    return <Skeleton variant="circular" width={size} height={size} data-testid="skeleton" />
  }

  // if the user doesn't have an avatar or there was an error, render their initials
  if (query.data?.avatar === null || query.isError) {
    return (
      <MUIAvatar
        className={classes.avatar}
        alt={username}
        title={title}
        sx={{ bgcolor: stringToColor(username), width: size, height: size }}
      >
        {initials.toUpperCase()}
      </MUIAvatar>
    )
  }

  // if the user has an avatar, render it
  return (
    <>
      {query.data?.avatar && (
        <MUIAvatar
          className={classes.avatar}
          src={query.data.avatar}
          alt={username}
          title={title}
          sx={{ width: size, height: size }}
        />
      )}
    </>
  )
}

const stringToColor = (string: string) => {
  let hash = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

export default Avatar
