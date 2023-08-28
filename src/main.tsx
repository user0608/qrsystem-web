import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { App } from './routes/App'
import './index.css'
const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      refetchOnWindowFocus: false,
      // cacheTime: ,
    },
  },
})
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
    <Toaster containerClassName='mt-8' />
  </React.StrictMode>,
  document.getElementById('root')
)
