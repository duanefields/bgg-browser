import { createFileRoute } from "@tanstack/react-router"
import User from "../components/User"
import { PlayerCount, Playtime, SortOrder } from "../shared.types"

type UserSearch = {
  sort?: SortOrder
  players?: PlayerCount
  playtime?: Playtime
}

const UserRouteComponent = () => {
  const { username } = Route.useParams()
  return <User username={username} />
}

export const Route = createFileRoute("/user/$username")({
  component: UserRouteComponent,
  validateSearch: (search: Record<string, unknown>): UserSearch => {
    return {
      sort: (search.sort as SortOrder) || "name",
      players: (search.players as PlayerCount) || 0,
      playtime: (search.playtime as Playtime) || 0,
    }
  },
})
