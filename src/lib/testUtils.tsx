import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router"
import { render } from "@testing-library/react"

/** Renders a collection of children with a Route and QueryClient Provider */
export const renderWithProviders = (children: React.ReactNode) => {
  // wrap the component in a fresh QueryClientProvider to isolate the tests
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  // create a router with a single route that renders the children in a QueryClientProvider
  const rootRoute = createRootRoute()
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
  })

  return render(<RouterProvider router={router} />)
}

/** Renders a collection of children with just a QueryClient Provider */
export const renderWithQueryProvider = (children: React.ReactNode) => {
  // wrap the component in a fresh QueryClientProvider to isolate the tests
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>)
}
