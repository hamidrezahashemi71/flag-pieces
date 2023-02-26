import '../styles/globals.css'
import { puzzleTheme } from '../styles/theme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import MainLayout from '../layout/main'
import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Loading from '../components/main/Loading'
import { setToken, useToken } from '../lib'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!useToken()) {
      const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
      setToken('set', token)
      const currentDatabse = JSON.parse(localStorage.getItem('puzzleFlag'))
      if (!currentDatabse) localStorage.setItem('puzzleFlag', JSON.stringify([{ token, games: {} }]))
      else localStorage.setItem('puzzleFlag', JSON.stringify([...currentDatabse, { token, games: {} }]))
    }
    setLoading(false)
  }, [])
  
  if(loading) return <Loading />
  return (
    <ThemeProvider theme={puzzleTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <MainLayout>
            <Component {...pageProps} />
            <ToastContainer />
          </MainLayout>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
