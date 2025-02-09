import { useState } from "react"
import useDebounce from "../hooks/useDebounce"
import { PlayerCount, Playtime, SortOrder } from "../shared.types"
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
  const search = routeApi.useSearch()
  const [searchText, setSearchText] = useState<string>("")
  const [sort, setSort] = useState<SortOrder>("name")
  const [players, setPlayers] = useState<PlayerCount>(search.players ?? 0)
  const [playtime, setPlaytime] = useState<Playtime>(0)
  const debouncedSearchText = useDebounce(searchText)

  const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const onSortChange = (value: SortOrder) => {
    setSort(value)
  }

  const onPlayerChange = (value: PlayerCount) => {
    setPlayers(value)
  }

  const onPlaytimeChange = (value: Playtime) => {
    setPlaytime(value)
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
