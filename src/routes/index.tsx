import { createFileRoute } from "@tanstack/react-router"
import Users from "../components/Users"

const UsersRouteComponent = () => {
  return <Users />
}

export const Route = createFileRoute("/")({
  component: UsersRouteComponent,
})
