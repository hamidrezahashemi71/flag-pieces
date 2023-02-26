import { findItem, setDatabase, useDatabase, useTitle, useToken } from "../../lib"
import ImageHolder from "../../components/game/ImageHolder"
import Loading from "../../components/main/Loading"
import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Container } from "@mui/system"
import { useRouter } from "next/router"



const Game = () => {

  const [thisGame, setThisGame] = useState(null)
  const router = useRouter()
  const database = useDatabase()
  const thisIndex = database.findIndex(item => item.token === useToken())

  // setting thisGame from created object in database
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

  // save game and add counter functionality
  const handleSubmitGame = () => {
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
    <Container maxWidth='lg' sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '54px'
    }}>

      <Head>
        <title>{ useTitle('Game') }</title>
        <meta name="description" content="Game page" />
      </Head>
      <Typography variant="h1" sx={{ textAlign: 'left' }} >
        {thisGame.name}
      </Typography>
      <ImageHolder
        gridSize={thisGame.pieces.length === 16 ? 4 : thisGame.pieces.length === 9 ? 3 : 2}
        gameDataHandler={(data) => setThisGame(data)}
        naturalHeight={thisGame.image.naturalHeight}
        naturalWidth={thisGame.image.naturalWidth}
        piecesNumber={thisGame.pieces.length}
        src={thisGame.image.src}
        parentData={thisGame}
        puzzleMode='usable'
        useFor='puzzle'
        step={2}
      />
      <Button
        variant="primaryButton"
        onClick={handleSubmitGame}
      >
        Save
      </Button>

    </Container>
  )

}

export default Game