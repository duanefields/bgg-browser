import { Link } from "@tanstack/react-router"
import Avatar from "../components/Avatar"

interface UsersProps {
  usernames: string[]
}

const Users = ({ usernames }: UsersProps) => {
  return (
    <>
      {usernames.map((username) => (
        <UserRow key={username} username={username} />
      ))}
    </>
  )
}

const UserRow = ({ username }: { username: string }) => {
  return (
    <div data-testid="user">
      <Link to="/user/$username" params={{ username }}>
        <Avatar username={username} />
        {username}
      </Link>
    </div>
  )
}

export default Users
