import { createFileRoute } from "@tanstack/react-router"
import Users from "../components/Users"

const UsersRouteComponent = () => {
  // todo: replace with cached list of past users pulled from local storage
  const usernames = ["dkf2112", "pandyandy", "markkolb", "EYE of NiGHT"]
  return <Users usernames={usernames} />
}

export const Route = createFileRoute("/")({
  component: UsersRouteComponent,
})
