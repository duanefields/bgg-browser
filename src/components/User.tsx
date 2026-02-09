import { useState } from "react"
import useDebounce from "../hooks/useDebounce"
import { PlayerCount, Playtime, SortOrder, UserSearch } from "../shared.types"
import Collection from "./Collection"
import PlayersMenu from "./PlayersMenu"
import PlaytimeMenu from "./PlaytimeMenu"
import RefreshButton from "./RefreshButton"
import SearchBox from "./SearchBox"
import SortMenu from "./SortMenu"
import classes from "./User.module.css"
import { getRouteApi } from "@tanstack/react-router"

type UserProps = {
  username: string
}

const routeApi = getRouteApi("/user/$username")

const User = ({ username }: UserProps) => {
  const { sort = "name", players = 0, playtime = 0 } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()
  const [searchText, setSearchText] = useState<string>("")
  const debouncedSearchText = useDebounce(searchText)

  const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const onSortChange = (value: SortOrder) => {
    void navigate({ search: (prev: UserSearch) => ({ ...prev, sort: value === "name" ? undefined : value }) })
  }

  const onPlayerChange = (value: PlayerCount) => {
    void navigate({ search: (prev: UserSearch) => ({ ...prev, players: value === 0 ? undefined : value }) })
  }

  const onPlaytimeChange = (value: Playtime) => {
    void navigate({ search: (prev: UserSearch) => ({ ...prev, playtime: value === 0 ? undefined : value }) })
  }

  return (
    <>
      <div className={classes.toolbar}>
        <SortMenu sort={sort} onChange={onSortChange} />
        <PlayersMenu players={players} onChange={onPlayerChange} />
        <PlaytimeMenu playtime={playtime} onChange={onPlaytimeChange} />
        <RefreshButton username={username} />
      </div>

      <div className={classes.header}>
        <SearchBox searchText={searchText} onChange={onSearchTextChange} />
      </div>

      <Collection
        username={username}
        searchText={debouncedSearchText}
        sort={sort}
        players={players}
        playtime={playtime}
      />
    </>
  )
}

export default User
