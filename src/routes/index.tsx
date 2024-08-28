import { createFileRoute, useNavigate } from "@tanstack/react-router"
import Users from "../components/Users"

const UsersRouteComponent = () => {
  const navigate = useNavigate()

  const onUserAdded = (username: string) => {
    void navigate({ to: "/user/$username", params: { username } })
  }

  return <Users onUserAdded={onUserAdded} />
}

export const Route = createFileRoute("/")({
  component: UsersRouteComponent,
})
