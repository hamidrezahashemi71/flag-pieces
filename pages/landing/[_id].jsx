import GameContainer from "../../components/game/GameContainer"
import { findItem, useTitle, useToken } from "../../lib"
import Loading from "../../components/main/Loading"
import { useEffect, useState } from "react"
import { Container } from "@mui/system"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import Head from 'next/head'



const Landing = () => {

  const [landingGameData, setLandingGameData] = useState(null)
  const { push, query } = useRouter()

  // set gameData from selected flag in home page
  useEffect(() => {
    if (!useToken()) {
      toast.error("Something went wrong! Create a new game")
      push('/')
    }
    if (query._id) {
      if (!findItem() || !findItem()['games'][query._id]) {
        toast.error("This game doesn't exist")
        push('/404')
      }
      else setLandingGameData({
        _id: query._id,
        name: findItem()['games'][query._id]['name'],
        image: findItem()['games'][query._id]['flag'],
        playingNumber: findItem()['games'][query._id]['playingNumber'],
      })
    }
  }, [query._id])

  if(!landingGameData) return <Loading />
  return (
    <Container maxWidth='lg' sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      
      <Head>
        <title>{ useTitle('Landing') }</title>
        <meta name="description" content="Landing page" />
      </Head>
      <GameContainer
        naturalHeight={landingGameData.image.naturalHeight}
        naturalWidth={landingGameData.image.naturalWidth}
        src={landingGameData.image.src}
        thisGame={landingGameData}
        useFor='landing'
      />

    </Container>
)
}

export default Landing