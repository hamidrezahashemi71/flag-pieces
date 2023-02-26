import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'


const CreateInfo = ({ name, selectedButton, handleSelect, parentData, setParentData }) => {

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

  const handleSelectPieces = (index) => {
    const clone = [...buttons]
    clone.forEach((item, i) => {
      if (index === i) {
        clone[index]['isSelected'] = true
        handleSelect(clone[index])
      }
      else clone[i]['isSelected'] = false
    })
    setButtons(clone)
  }

  return ( 
    <> 
      
      <Typography
        variant="h1"
        sx={{ mb: '30px' }}
      >
        {name.length > 13 ? name.slice(0, 12) + '...' : name}
      </Typography>
      <Typography
        variant="h6"
        sx={{ mb: '15px' }}
      >
        Please choose puzzle pieces number:
      </Typography>  
      <Grid
        container
        columns={3}
        sx={{ width: '250px', mb: '15px' }}
      >
        {buttons.map((item, index) => {
          return (
          <Grid
            item
            xs={1}
            sx={{ p: '4px' }}
          >
            <Button
              variant={item.isSelected ? 'primaryButton' : 'glassButton'}
              onClick={() => handleSelectPieces(index)}
              sx={{ width: '100%', mt: 0 }}
            >
              {item.piecesNumber}
            </Button>
          </Grid>
          )
        })
        } 
      </Grid>
    <Typography
      variant="h6"
      sx={{ mb: '15px' }}
      >
        Please choose unusabel pieces and enter the info:
    </Typography>  
    <TextField
      onChange={(e) => setParentData({...parentData, name: e.target.value})}
      placeholder="Enter Game Name"
    />
    <TextField
      onChange={(e) => setParentData({ ...parentData, password: e.target.value })}
      placeholder="Enter Password"
      type={'password'}
      sx={{ marginTop:'10px' }}
    />
      
  </>
  )
}

export default CreateInfo