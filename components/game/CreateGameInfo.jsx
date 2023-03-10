import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'



const CreateGameInfo = ({ flagName, selectedButton, piecesNumberHandler, gameData, gameDataHandler }) => {

  const [buttons, setButtons] = useState([
    { ...selectedButton },
    {
      _id:2,
      piecesNumber: 9,
      isSelected: false,
      gridSize: 3
    },
    {
      _id:3,
      piecesNumber: 16,
      isSelected: false, 
      gridSize: 4
    }])

  // choose pieces number button functionality
  const handlePiecesButton = (index) => {
    const clone = [...buttons]
    clone.forEach((item, i) => {
      if (index === i) {
        clone[index]['isSelected'] = true
        piecesNumberHandler(clone[index])
      }
      else clone[i]['isSelected'] = false
    })
    setButtons(clone)
  }

  return ( 
    <> 
      
      <Typography variant="h1" sx={{ mb: '30px' }}>
        {flagName.length && flagName.length > 13 ? flagName.slice(0, 12) + '...' : flagName}
      </Typography>
      <Typography variant="h6" sx={{ mb: '15px' }} >
        Please choose flag pieces number:
      </Typography>  
      <Grid container columns={3} sx={{
        width: '250px',
        mb: '15px',
      }}
      >
        {buttons.map((button, buttonIndex) => {

          return (
            <Grid key={button._id} item xs={1} sx={{ p: '4px' }} >

              <Button
                variant={button.isSelected ? 'primaryButton' : 'glassButton'}
                onClick={() => handlePiecesButton(buttonIndex)}
                sx={{ width: '100%', mt: 0 }}
              >
                {button.piecesNumber}
              </Button>
              
            </Grid>
          )

        })
      } 
      </Grid>
      <Typography variant="h6" sx={{ mb: '15px' }}>
        Please choose unusabel pieces and enter the info:
      </Typography>  
      <TextField
        onChange={(e) => gameDataHandler({...gameData, name: e.target.value})}
        placeholder="Enter Game Name"
      />
      <TextField
        onChange={(e) => gameDataHandler({ ...gameData, password: e.target.value })}
        placeholder="Enter Password"
        sx={{ marginTop:'10px' }}
        type={'password'}
    />
      
  </>
  )
}

export default CreateGameInfo