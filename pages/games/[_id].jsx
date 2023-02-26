import { Button, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ImageHolder from "../../components/game/ImageHolder"
import Loading from "../../components/main/Loading"
import { findItem, setDatabase, useDatabase, useToken } from "../../lib"

const Game = () => {

  const [thisGame, setThisGame] = useState(null)

  const router = useRouter()
  const database = useDatabase()
  const thisIndex = database.findIndex(item => item.token === useToken())

  useEffect(() => {
    database[thisIndex]['games'][router.query._id]['isPasswordCorrect'] = true
    if (!useToken()) router.push('/')
    if (router.query._id) {
      if (!findItem() | !findItem()['games'][router.query._id]) router.push('/404')
        
      else if (!database[thisIndex]['games'][router.query._id]['isPasswordCorrect']) router.push({
        pathname: '/login/[_id]',
        query: {_id: router.query._id}
      })
        
      else setThisGame({
        _id: router.query._id,
        image: findItem()['games'][router.query._id]['flag'],
        pieces: [...findItem()['games'][router.query._id]['pieces']],
        playingNumber: findItem()['games'][router.query._id]['playingNumber'],
        name: findItem()['games'][router.query._id]['name']
      })
    }
  }, [router.query._id])

  const handleSubmit = () => {
    database[thisIndex]['games'][thisGame._id] = {
      ...database[thisIndex]['games'][thisGame._id],
      pieces: [...thisGame.pieces],
      playingNumber: thisGame.playingNumber + 1,
      isPasswordCorrect: false
    }

    setDatabase(database)

    router.push({
      pathname: '/landing/[_id]',
      query: {_id: thisGame._id}
    })
  }

  if(!thisGame) return <Loading />
  return (
    <Container maxWidth='lg'
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap:'54px' }}>
      <Typography variant="h1" sx={{ textAlign: 'left' }} >{thisGame.name}</Typography>
      <ImageHolder
        useFor='puzzle'
        src={thisGame.image.src}
        piecesNumber={thisGame.pieces.length}
        gridSize={thisGame.pieces.length === 16 ? 4 : thisGame.pieces.length === 9 ? 3 : 2}
        puzzleMode='usable'
        naturalWidth={thisGame.image.naturalWidth}
        naturalHeight={thisGame.image.naturalHeight}
        step={2}
        parentData={thisGame}
        setParentData={(data) => setThisGame(data)}
      />
      <Button variant="primaryButton" onClick={handleSubmit}>
        Save
      </Button>
    </Container>
  )
}

export default Game