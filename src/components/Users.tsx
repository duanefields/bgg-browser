import { Link, useNavigate } from "@tanstack/react-router"
import Avatar from "../components/Avatar"
import { Button, TextField } from "@mui/material"
import React from "react"

interface UsersProps {
  usernames: string[]
}

const Users = ({ usernames }: UsersProps) => {
  const [username, setUsername] = React.useState("")
  const navigate = useNavigate()

  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // todo: update the local storage MRU user list, if it is a valid user
    void navigate({ to: "/user/$username", params: { username } })
  }

  return (
    <>
      {usernames.map((username) => (
        <UserRow key={username} username={username} />
      ))}

      <form onSubmit={handleSubmission}>
        <TextField
          type="text"
          value={username}
          placeholder="BGG Username"
          variant="standard"
          onChange={(event) => setUsername(event.target.value)}
        />
        <Button type="submit" variant="contained">
          Browse Collection
        </Button>
      </form>
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
