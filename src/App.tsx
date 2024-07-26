import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"
import "./App.css"
import classes from "./App.module.css"
import Avatar from "./components/Avatar"
import Collection from "./components/Collection"
import SearchBox from "./components/SearchBox"
import SortMenu from "./components/SortMenu"
import useDebounce from "./hooks/useDebounce"
import { PlayerCount, SortOrder } from "./shared.types"
import PlayersMenu from "./components/PlayersMenu"

const queryClient = new QueryClient()
const username = "dkf2112"

const App = () => {
  const [searchText, setSearchText] = useState("")
  const [sort, setSort] = useState<SortOrder>("name")
  const [players, setPlayers] = useState<PlayerCount>(0)

  const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }
  const debouncedSearchText = useDebounce(searchText)

  const onSortChange = (value: SortOrder) => {
    setSort(value)
  }

  const onPlayerChange = (value: PlayerCount) => {
    setPlayers(value)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Avatar username={username} />

        <SortMenu sort={sort as SortOrder} onChange={onSortChange} />
        <PlayersMenu players={players as PlayerCount} onChange={onPlayerChange} />

        <div className={classes.header}>
          <h1>BGG Collection Browser</h1>
          <SearchBox searchText={searchText} onChange={onSearchTextChange} />
        </div>

        <Collection
          username={username}
          searchText={debouncedSearchText}
          sort={sort as SortOrder}
          players={players as PlayerCount}
        />
      </>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
