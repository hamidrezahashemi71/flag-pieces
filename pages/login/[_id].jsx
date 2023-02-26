import Loading from "../../components/main/Loading"
import Typography from '@mui/material/Typography'
import { Button, TextField } from "@mui/material"
import { findItem, useTitle } from "../../lib"
import { useEffect, useState } from "react"
import { Container } from "@mui/system"
import { useRouter } from "next/router"
import { toast } from 'react-toastify'



const Login = () => {

  const router = useRouter()
  const [loginData, setLoginData] = useState({
    _id: null,
    password: '',
    loading: true
  })
  const thisItem = findItem()
  const gameId = router.query._id

  // setting loginData from created object in database
  useEffect(() => {
    if (gameId) {
      if (!thisItem || !thisItem['games'][gameId]) router.push('/404')
      else setLoginData({ ...loginData, thisItem, _id: gameId, loading:false })
    }
  }, [router.query._id])

  // login functionality for comparing passwords
  const loginHandler = () => {
    if (!loginData.password || loginData.password !== loginData.thisItem.games[gameId].password)
      return toast.error("Incorrect Password")
    else {
      toast.success("Let's Play!")
      router.push({
        pathname: '/games/[_id]',
        query: {_id: loginData._id}
      })
      }
  }

  if(loginData.loading) return <Loading />
    return (
      <Container maxWidth={false} sx={{
        minHeight: "120vh",
        marginTop: '129px',
        display: 'flex',
        gap: '38px',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      }}>

        <Head>
          <title>{ useTitle('Login') }</title>
          <meta name="description" content="Login page" />
        </Head>
        <Typography variant="h4" component='h4'>
          Game Password
        </Typography>
        <TextField
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          placeholder="password"
          type={'password'}
        />
        <Button
          variant="secondaryButton"
          onClick={loginHandler}
        >
          Save
        </Button>

      </Container>
    )
  
  }


export default Login