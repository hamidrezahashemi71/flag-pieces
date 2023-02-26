import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query'
import Loading from '../components/main/Loading'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@emotion/react'
import { puzzleTheme } from '../styles/theme'
import { CssBaseline } from '@mui/material'
import { setToken, useToken } from '../lib'
import { useEffect, useState } from 'react'
import MainLayout from '../layout/main'
import '../styles/globals.css'



export const queryClient = new QueryClient()


export default function App({ Component, pageProps }) {

  const [loading, setLoading] = useState(true)

  // appStep1: setting the database and token on app mount 
  useEffect(() => {
    const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
    if (!useToken()) setToken('set', token)
    const currentDatabse = JSON.parse(localStorage.getItem('flagPieces'))
    if (!currentDatabse) localStorage.setItem('flagPieces', JSON.stringify([{ token, games: {} }]))
    else localStorage.setItem('flagPieces', JSON.stringify([...currentDatabse, { token, games: {} }]))
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
