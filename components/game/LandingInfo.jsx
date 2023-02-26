import { Typography } from '@mui/material'
import { Container } from '@mui/system'

const LandingInfo = ({thisGame}) => {

  return (
    <>
      
      <Typography variant="mainText">
        Try your chance
      </Typography>
      <Typography variant="h1" sx={{ mb: '54px' }} >{thisGame.name}</Typography>
      <Typography variant="mainText"  >
        The Number of Playing this Game
      </Typography>
      <Container disableGutters className="counterBox" style={{
         borderImage: "linear-gradient(269.52deg, #E89951 1.95%, #FF8C68 1.96%, #8449E4 83.59%) 1",
         justifyContent: "center",
         alignItems: "center",
         borderRadius: "7px",
         borderStyle: "solid",
         borderWidth: "2px",
         marginTop: "14px",
         display: "flex",
         height: "52px",
         width: "94px",
         margin: "0",
      }}>

        <Typography className="copyright" sx={{ fontSize: '32px' }}>
          {thisGame['playingNumber']}
        </Typography>

      </Container>
      
    </>
  )
}

export default LandingInfo