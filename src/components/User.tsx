import { useIsFetching, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import useDebounce from "../hooks/useDebounce"
import { PlayerCount, Playtime, SortOrder } from "../shared.types"
import Collection from "./Collection"
import PlayersMenu from "./PlayersMenu"
import PlaytimeMenu from "./PlaytimeMenu"
import SearchBox from "./SearchBox"
import SortMenu from "./SortMenu"
import classes from "./User.module.css"
import RefreshButton from "./RefreshButton"

type UserProps = {
  username: string
}

const User = ({ username }: UserProps) => {
  const [searchText, setSearchText] = useState<string>("")
  const [sort, setSort] = useState<SortOrder>("name")
  const [players, setPlayers] = useState<PlayerCount>(0)
  const [playtime, setPlaytime] = useState<Playtime>(0)
  const queryClient = useQueryClient()
  const isFetching = useIsFetching()
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

  const onRefreshClick = () => {
    void queryClient.invalidateQueries({ queryKey: ["collection", username] })
  }

  return (
    <>
      <div className={classes.toolbar}>
        <SortMenu sort={sort} onChange={onSortChange} />
        <PlayersMenu players={players} onChange={onPlayerChange} />
        <PlaytimeMenu playtime={playtime} onChange={onPlaytimeChange} />
        <RefreshButton onClick={onRefreshClick} spin={isFetching > 0} />
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
