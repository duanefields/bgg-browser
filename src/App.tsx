import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import "./App.css"
import Collection from "./components/Collection"
import SearchBox from "./components/SearchBox"
import { useState } from "react"
import useDebounce from "./hooks/useDebounce"
import classes from "./App.module.css"
import Avatar from "./components/Avatar"

const queryClient = new QueryClient()

const App = () => {
  const [searchText, setSearchText] = useState("")
  const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }
  const debouncedSearchText = useDebounce(searchText)

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Avatar username="dkf2112" />
        <div className={classes.header}>
          <h1>BGG Collection Browser</h1>
          <SearchBox searchText={searchText} onChange={onSearchTextChange} />
        </div>

        <Collection username="dkf2112" searchText={debouncedSearchText} />
      </>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
