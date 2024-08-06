import React, { Suspense } from "react"
import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import NavBar from "../components/NavBar"

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 10,
    },
  },
})

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <NavBar />
    <hr />
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
