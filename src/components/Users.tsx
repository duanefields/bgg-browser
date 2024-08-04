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
    void navigate({ to: "/user/$username", params: { username } })
  }

  return (
    <>
      {usernames.sort().map((username) => (
        <UserRow key={username} username={username} />
      ))}

      <form onSubmit={handleSubmission}>
        <TextField
          type="text"
          value={username}
          placeholder="BGG Username"
          variant="standard"
          onChange={(event) => setUsername(event.target.value)}
          inputProps={{
            "data-1p-ignore": true,
            "data-lpignore": true,
            autoCorrect: "off",
            autoCapitalize: "off",
          }}
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
