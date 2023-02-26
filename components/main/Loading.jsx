import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import * as React from 'react';



const Loading = () => {

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
  
}

export default Loading;