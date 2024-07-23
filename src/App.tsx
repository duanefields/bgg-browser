import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import "./App.css"
import reactLogo from "./assets/react.svg"
import CurrentUser from "./components/CurrentUser"
import CounterButton from "./components/CounterButton"
import viteLogo from "/vite.svg"
import Collection from "./components/Collection"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1>Vite + React</h1>

        <div className="card">
          <CounterButton />
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <div>
          <CurrentUser />
        </div>

        <div>
          <Collection />
        </div>

        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
