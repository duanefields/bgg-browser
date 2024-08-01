import { createFileRoute } from "@tanstack/react-router"
import User from "../components/User"

const UserRouteComponent = () => {
  const { username } = Route.useParams()
  return <User username={username} />
}

export const Route = createFileRoute("/user/$username")({
  component: UserRouteComponent,
})
