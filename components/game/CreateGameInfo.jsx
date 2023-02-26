import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'



const CreateGameInfo = ({ name, selectedButton, piecesNumberHandler, gameData, gameDataHandler }) => {
  console.log(name)
  const [buttons, setButtons] = useState([
    { ...selectedButton },
    {
      piecesNumber: 9,
      isSelected: false,
      gridSize: 3
    },
    {
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
        console.log(clone[index])
      }
      else clone[i]['isSelected'] = false
    })
    setButtons(clone)
  }

  return ( 
    <> 
      
      <Typography variant="h1" sx={{ mb: '30px' }}>
        {name.length && name.length > 13 ? name.slice(0, 12) + '...' : name}
      </Typography>
      <Typography variant="h6" sx={{ mb: '15px' }} >
        Please choose puzzle pieces number:
      </Typography>  
      <Grid container columns={3} sx={{
        width: '250px',
        mb: '15px',
      }}
      >
        {buttons.map((button, buttonIndex) => {

          return (
            <Grid item xs={1} sx={{ p: '4px' }} >

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