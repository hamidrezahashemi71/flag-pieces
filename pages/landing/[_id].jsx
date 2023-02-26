import GameContainer from "../../components/game/GameContainer"
import { findItem, useTitle, useToken } from "../../lib"
import Loading from "../../components/main/Loading"
import { useEffect, useState } from "react"
import { Container } from "@mui/system"
import { useRouter } from "next/router"
import Head from 'next/head'



const Landing = () => {

  const [gameData, setGameData] = useState(null)
  const router = useRouter()

  // set gameData from selected flag in home page
  useEffect(() => {
    if(!useToken()) router.push('/')
    if (router.query._id) {
      if (!findItem() || !findItem()['games'][router.query._id]) router.push('/404')
      else setGameData({
        _id: router.query._id,
        name: findItem()['games'][router.query._id]['name'],
        image: findItem()['games'][router.query._id]['flag'],
        playingNumber: findItem()['games'][router.query._id]['playingNumber'],
      })
    }
  }, [router.query._id])

  if(!gameData) return <Loading />
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
        naturalHeight={gameData.image.naturalHeight}
        naturalWidth={gameData.image.naturalWidth}
        src={gameData.image.src}
        thisGame={gameData}
        useFor='landing'
      />

    </Container>
)
}

export default Landing