import { Link, useNavigate } from "@tanstack/react-router"
import Avatar from "../components/Avatar"
import { Button, TextField } from "@mui/material"
import React from "react"
import { useMutation } from "@tanstack/react-query"
import { getUser } from "../lib/api"

interface UsersProps {
  usernames: string[]
}

const Users = ({ usernames }: UsersProps) => {
  const [username, setUsername] = React.useState("")
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ["user", username],
    mutationFn: getUser,
  })

  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate(username)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  if (mutation.isSuccess) {
    void navigate({ to: "/user/$username", params: { username } })
    return null
  }

  return (
    <>
      {usernames.sort().map((username) => (
        <UserRow key={username} username={username} />
      ))}

      <h2>Add a User</h2>

      {mutation.isError && <div>{mutation.error.message}</div>}

      <form onSubmit={handleSubmission}>
        <UsernameBox username={username} handleChange={handleChange} />
        &nbsp;
        <Button type="submit" variant="contained">
          Browse Collection
        </Button>
      </form>
    </>
  )
}

interface UsernameBoxProps {
  username: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UsernameBox = ({ username, handleChange }: UsernameBoxProps) => {
  return (
    <TextField
      type="text"
      value={username}
      placeholder="BGG Username"
      variant="standard"
      onChange={handleChange}
      inputProps={{
        "data-1p-ignore": true,
        "data-lpignore": true,
        autoCorrect: "off",
        autoCapitalize: "off",
      }}
    />
  )
}

interface UserRowProps {
  username: string
}
const UserRow = ({ username }: UserRowProps) => {
  return (
    <div data-testid="user">
      <Link to="/user/$username" params={{ username }}>
        <Avatar username={username} size={64} />
        {username}
      </Link>
    </div>
  )
}

export default Users
