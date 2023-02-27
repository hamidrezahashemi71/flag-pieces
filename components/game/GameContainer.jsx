import { findItem, setDatabase, useDatabase, useToken } from "../../lib"
import { Box, Grid, Container, Button } from "@mui/material"
import CreateGameInfo from "./CreateGameInfo"
import ImageHolder from "./ImageHolder"
import LandingInfo from "./LandingInfo"
import { useRouter } from "next/router"
import { toast } from 'react-toastify'
import { useState } from "react"
import Image from "next/image"



const GameContainer = ({ useFor, src, flagName, naturalWidth, naturalHeight, thisGame }) => {
  
  const [pieceNumbers, setPieceNumbers] = useState({
    isSelected: true,
    piecesNumber: 4,
    gridSize: 2
  })

  const [gameData, setGameData] = useState({
    name: '',
    password: '',
    pieces: [],
  })

  const router = useRouter()

  // create game button functionality for home page
  const handleCreateGame = () => {
    const database = useDatabase()
    const thisItem = findItem()
    const thisIndex = database.findIndex(item => item.token === useToken())
    const gameId = `${new Date().getTime()}${String(Math.random()).slice(3, 9)}`

    if (!gameData) return toast.error("Please Enter Information!")
    if (!gameData.name) return toast.error("Please Enter Your Game Name!")
    if (!gameData.password) return toast.error("Please Enter Your Game Password!")
    if (!useToken()) return toast.error("Connection Error! Refresh the page and try again!")
    if (!thisItem)
      return toast.error("Connection Error! Refresh the page and try again!")
    if (Object.keys(thisItem['games']).length > 2)
      return toast.error("You cannot create more than 3 games!")

    thisItem['games'][gameId] = {
    name: gameData.name,
    password: gameData.password,
    pieces: gameData.pieces,
    playingNumber: 0,
    flag: {
      src,
      naturalWidth,
      naturalHeight
    },
    isPasswordCorrect: false
  }

    database[thisIndex] = thisItem
    setDatabase(database)
    toast.success("Game created successfully!")
    router.push({
      pathname: '/landing/[_id]',
      query: {_id: gameId}
    })
  }

  // go to login button functionality for landing page
  const handleNextStep = () => router.push({ pathname: '/login/[_id]', query: { _id: thisGame._id } })
  
  return (
    <Container disableGutters maxWidth={'lg'} sx={{
      position: 'relative',
      height: '402px',
      mb: '100px',
      mt: '70px',
    }}>

      <Container disableGutters maxWidth={'lg'} sx={{
        background: '#141414',
        position: 'absolute',
        borderRadius: '20px',
        height:'100%',
        left: '0',
        top: '0',
      }}>

        <Container disableGutters maxWidth={'lg'} sx={{
          borderColor:'#6F6F6F',
          position: 'absolute',
          borderRadius: '20px',
          overflow:'hidden',
          height:'402px',
          border:0.5,
          left: '0',
          top: '0',
        }} > 
          
            <Image src={'/assets/images/rectangle-bg.png'} fill />
            <Container disableGutters maxWidth={false} sx={{
              transform: "matrix(0.95, 0.31, -0.4, 0.92, 0, 0)",
              background: "#8449E4",
              position: "absolute",
              filter: "blur(192px)",
              height: "340px",
              width: "875px",
              left:" 900px",
              top: "-44%",
            }} />
            <Container disableGutters maxWidth={false} sx={{
              position: "absolute",
              borderRadius: "50%",
              background: "black",
              height: "492px",
              bottom: "-60%",
              width: "492px",
              zIndex: "10",
              left: "0",
          }} />
          
        </Container>

        <Grid container >

          <Grid item zIndex={20} xs={6} sx={{
              position: 'absolute', 
              bottom: '0px',
              left: '70px',
          }}>
  
            <ImageHolder
              gameDataHandler={(data) => setGameData(data)}
              piecesNumber={pieceNumbers.piecesNumber}
              gridSize={pieceNumbers.gridSize} 
              naturalHeight={naturalHeight}
              naturalWidth={naturalWidth}
              flagMode='unusable'
              gameData={gameData}
              useFor={useFor}
              src={src}
              step={1}
            />

          </Grid>

          <Grid item zIndex={20} xs={4} sx={{
            top: useFor === 'game' ? '25px' : '126px',
            position: 'absolute', 
            left: '564px',
          }}>

            <Box>
                {useFor === 'game' ?
              <CreateGameInfo
                piecesNumberHandler={(data) => setPieceNumbers(data)}
                gameDataHandler={(data) => setGameData(data)}
                selectedButton={pieceNumbers}
                gameData={gameData}
                flagName={flagName}
              />
              :
              <LandingInfo thisGame={thisGame} />
                }
            </Box>

          </Grid>
          
          <Grid item xs={2} sx={{
            bottom: useFor === 'game' ? '34px' : '47px',
            position: 'absolute', 
            right:'47px',
          }}>
              {useFor === 'game' ?
            <Button
              variant="primaryButton"
              onClick={handleCreateGame}
            >
              Create!
            </Button>
              :
            <Button
              variant="primaryButton"
              onClick={handleNextStep}
            >
              {thisGame["playingNumber"] === 0 ? "Play Now!" : "Play Again!"}
            </Button>
              }
          </Grid>
        </Grid>
      </Container>
    </Container>
  )

}

export default GameContainer