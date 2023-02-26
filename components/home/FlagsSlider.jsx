import FlagSliderNavigation from "./FlagsSliderNavigation"
import { Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"
import FlagCard from "./FlagCard"
import { useState } from "react" 



const FlagSlider = ({ finalFlags, pages, handleChooseFlag }) => {
  
  const [currentPage, setCurrentPage] = useState(Number(pages[0]))

  return ( 
    <Container disableGutters maxWidth='xl' sx={{
      justifyContent: "space-around",
      width: '1199px',
      display: 'flex',
      gap: "10px",
      mt: '40px',
    }}>

      <FlagSliderNavigation
        goBackward={() => setCurrentPage(currentPage - 1)}
        currentPage={currentPage}
        lastPage={pages.length}
        useFor='backward'
      />
      <Grid container columns={5} className='' sx={{
        width: "calc(100% - 220px)",
        height: "770px",
      }}>
        {
          finalFlags && finalFlags[currentPage] ?
          finalFlags[currentPage].map((flag, item, ref) => {
            return(
              <Grid key={flag.name} item xs={1} sx={ ref.length < 6 ? {height: '50%'} : {} }>
                <FlagCard flag={flag} handleChooseFlag={handleChooseFlag} />
              </Grid>
            )
          })
            :
            <Container sx={{
              justifyContent:'center', 
              flexDirection:'column', 
              alignItems: 'center',
              display:'flex', 
            }}
            >
              <Typography variant="h5">
                No data was found. Check your internet connection.
              </Typography>
            </Container>
        }
      </Grid>
      <FlagSliderNavigation
          goForward={() => setCurrentPage(currentPage + 1)}
          currentPage={currentPage}
          lastPage={pages.length}
          useFor='forward'
      />
      
    </Container>
  )
  
}

export default FlagSlider