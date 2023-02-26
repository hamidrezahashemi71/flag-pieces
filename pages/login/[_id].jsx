import { Container } from "@mui/system"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { findItem, setToken, useDatabase, useToken } from "../../lib"
import Typography from '@mui/material/Typography'
import { Button, TextField } from "@mui/material"
import Loading from "../../components/main/Loading"
import { toast } from 'react-toastify'

const Login = () => {

  const router = useRouter()

  const [data, setData] = useState({
    _id: null,
    password: '',
    error: null,
    loading: true
  })

  const thisItem = findItem()
  const gameId = router.query._id

  useEffect(() => {
    if (gameId) {
      if (!thisItem || !thisItem['games'][gameId]) router.push('/404')
      else setData({ ...data, thisItem, _id: gameId, loading:false })
    }
  }, [router.query._id])

  const loginHandler = () => {
    if (!data.password || data.password !== data.thisItem.games[gameId].password)
      return toast.error("Incorrect Password")
    else {
      toast.success("Let's Play!")
      router.push({
        pathname: '/games/[_id]',
        query: {_id: data._id}
      })
      }
  }

  if(data.loading) return <Loading />
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
        <Typography variant="h4" component='h4'>Game Password</Typography>
        <TextField
          placeholder="password"
          type={'password'}
          onChange={(e) => setData({ ...data, password: e.target.value })}
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