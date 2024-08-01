import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router"
import { render } from "@testing-library/react"

export const renderWithProviders = (children: React.ReactNode) => {
  // wrap the component in a fresh QueryClientProvider to isolate the tests
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const rootRoute = createRootRoute()

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  })

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
  })

  // @ts-expect-error no way to specify the type of the router inside this function
  return render(<RouterProvider router={router} />)
}

// todo: split up the renderWithProviders function into smaller functions
