import { RouterProvider } from 'react-router-dom'
import routes from './router/routes'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { data } from 'autoprefixer'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKey: ["data-user"],
      staleTime: 60 * 60 * 1000
    }
  }
})


function App() {

  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={routes} />

      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default App
