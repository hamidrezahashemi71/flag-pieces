import { Box, Grid, Container, Button } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { findItem, setDatabase, useDatabase, useToken } from "../../lib"
import CreateInfo from "./CreateInfo"
import ImageHolder from "./ImageHolder"
import LandingInfo from "./LandingInfo"
import { toast } from 'react-toastify'

const GameContainer = ({ useFor, src, name, naturalWidth, naturalHeight, thisGame }) => {
  
  const [selectedButton, setSelectedButton] = useState({
    piecesNumber: 4,
    isSelected: true,
    gridSize: 2
  })

  const [data, setData] = useState({
    name: '',
    password: '',
    pieces: [],
  })

  const router = useRouter()
  const thisItem = findItem()
  const database = useDatabase()

  const handlePlay = () => {
    if (!data) return toast.error("Please Enter Information!")
    if (!data.name) return toast.error("Please Enter Your Game Name!")
    if (!data.password) return toast.error("Please Enter Your Game Password!")
    if (!useToken()) return toast.error("Connection Error! Refresh the page and try again!")

    if (!thisItem) return 
    if (Object.keys(thisItem['games']).length > 2) return toast.error("You cannot create more than 3 games!")

    const thisIndex = database.findIndex(item => item.token === useToken())
    const gameId = `${new Date().getTime()}${String(Math.random()).slice(3, 9)}`
    thisItem['games'][gameId] = {
      name: data.name,
      password: data.password,
      pieces: data.pieces,
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
    router.push({
      pathname: '/landing/[_id]',
      query: {_id: gameId}
    })
  }

  return (
    <Container disableGutters maxWidth={'lg'} sx={{
      position: 'relative',
      mb: '100px',
      mt: '70px',
      height: '402px'
    }}>
      <Container disableGutters maxWidth={'lg'} sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        height:'100%',
        borderRadius: '20px',
        background: '#141414',
      }}>
        <Container disableGutters maxWidth={'lg'} sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          border:0.5,
          borderColor:'#6F6F6F',
          height:'402px',
          borderRadius: '20px',
          overflow:'hidden'
        }}>
          <Image src={'/assets/images/rectangle-bg.png'} fill />
          <Container disableGutters maxWidth={false} className="purpleEllipse" />
          <Container disableGutters maxWidth={false} className="blackEllipse" zIndex={10} />
        </Container>
        <Grid container >
          <Grid item zIndex={20} xs={6} sx={{
              position: 'absolute', 
              left: '70px',
              bottom: '0px',
            }}>
            <ImageHolder
              useFor={useFor}
              src={src}
              piecesNumber={selectedButton.piecesNumber}
              gridSize={selectedButton.gridSize} 
              puzzleMode='unusable'
              naturalWidth={naturalWidth}
              naturalHeight={naturalHeight}
              setParentData={(data) => setData(data)}
              parentData={data}
              step={1}
            />
          </Grid>
          <Grid item zIndex={20} xs={4} sx={{
            position: 'absolute', 
            left: '564px',
            top: useFor === 'puzzle' ? '25px' : '126px'
          }}>
            <Box>
              {
                useFor === 'puzzle' ?
                  <CreateInfo
                    name={name}
                    selectedButton={selectedButton}
                    handleSelect={(data) => setSelectedButton(data)}
                    setParentData={(data) => setData(data)}
                    parentData={data}
                  />
                  :
                  <LandingInfo thisGame={thisGame} />
              }
            </Box>
          </Grid>
          <Grid item xs={2} sx={{
            position: 'absolute', 
            right:'47px',
            bottom: useFor === 'puzzle' ? '34px' : '47px'
          }}>
            {
              useFor === 'puzzle' ?
                <Button
                  variant="primaryButton"
                  onClick={handlePlay}>Create!</Button>
                  :
                <Button
                  variant="primaryButton"
                  onClick={() => router.push({ pathname: '/login/[_id]', query: { _id: thisGame._id } })}>
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