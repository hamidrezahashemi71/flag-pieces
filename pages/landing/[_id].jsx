import { Container } from "@mui/system"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import GameContainer from "../../components/game/GameContainer"
import Loading from "../../components/main/Loading"
import { findItem, useToken } from "../../lib"

const Landing = () => {

  const [gameData, setGameData] = useState(null)

  const router = useRouter()

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
    <Container maxWidth='lg' sx={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <GameContainer useFor='landing' thisGame={gameData} src={gameData.image.src} naturalHeight={gameData.image.naturalHeight} naturalWidth={gameData.image.naturalWidth} />
    </Container>
)
}

export default Landing