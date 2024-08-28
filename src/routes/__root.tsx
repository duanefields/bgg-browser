import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import React, { Suspense } from "react"
import NavBar from "../components/NavBar"
import { persistQueryClient } from "@tanstack/react-query-persist-client"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

const cacheTime = 1000 * 60 * 60 * 24 * 7 // 7 days
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 10,
      gcTime: cacheTime,
      staleTime: cacheTime,
    },
  },
})

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
})

void persistQueryClient({
  queryClient,
  persister: localStoragePersister,
})

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <NavBar />
    <Outlet />
    <Suspense>
      <TanStackRouterDevtools />
    </Suspense>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

export const Route = createRootRoute({
  component: Root,
})
