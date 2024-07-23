import { useQuery } from "@tanstack/react-query"
import { getUserById } from "../lib/api"

const CurrentUser = () => {
  const userId = 1
  const query = useQuery({ queryKey: ["user", userId], queryFn: () => getUserById(userId) })
  const name = query.data?.name || null
  return <div>{name ? `Logged in as ${name}` : "Not logged in"}</div>
}

export default CurrentUser
