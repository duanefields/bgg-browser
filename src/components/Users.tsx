import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, IconButton, TextField } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import React from "react"
import { useLocalStorage } from "usehooks-ts"
import Avatar from "../components/Avatar"
import { getUser } from "../lib/api"

type UsersProps = {
  onUserAdded?: (username: string) => void
}

const Users = ({ onUserAdded }: UsersProps) => {
  const [username, setUsername] = React.useState("")
  const [usernames, setUsernames] = useLocalStorage<string[]>("usernames", [])

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

  const handleDelete = (username: string) => {
    setUsernames(usernames.filter((u) => u !== username))
  }

  if (mutation.isSuccess) {
    if (!usernames.includes(username)) {
      setUsernames([...usernames, username])
    }
    if (onUserAdded) {
      onUserAdded(username)
    }
  }

  return (
    <>
      {usernames.sort().map((username) => (
        <UserRow key={username} username={username} onDelete={handleDelete} />
      ))}

      <h2>Add a User</h2>

      {mutation.isError && <div>{mutation.error.message}</div>}

      <form onSubmit={handleSubmission}>
        <UsernameBox
          username={username}
          handleChange={handleChange}
          disabled={mutation.isPending}
        />
        &nbsp;
        <Button type="submit" variant="contained" disabled={mutation.isPending}>
          Browse Collection
        </Button>
      </form>
    </>
  )
}

type UsernameBoxProps = {
  username: string
  disabled: boolean
  handleChange: React.ChangeEventHandler<HTMLInputElement>
}

const UsernameBox = ({ username, handleChange, disabled }: UsernameBoxProps) => {
  return (
    <TextField
      type="text"
      value={username}
      placeholder="BGG Username"
      variant="standard"
      onChange={handleChange}
      disabled={disabled}
      inputProps={{
        "data-1p-ignore": true,
        "data-lpignore": true,
        autoCorrect: "off",
        autoCapitalize: "off",
      }}
    />
  )
}

type UserRowProps = {
  username: string
  onDelete: (username: string) => void
}
const UserRow = ({ username, onDelete }: UserRowProps) => {
  return (
    <div data-testid="user">
      <Link to="/user/$username" params={{ username }}>
        <Avatar username={username} size={64} />
      </Link>
      {username}

      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => {
          onDelete(username)
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </IconButton>
    </div>
  )
}

export default Users
