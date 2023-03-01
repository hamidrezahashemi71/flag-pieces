import { Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"
import Image from "next/image"
import Link from "next/link"



const Footer = () => {

  return (
    <Container disableGutters maxWidth={false} sx={{
      background: "#111111",
      width: "100%",
      margin: "0px",
      pb: "16px"
    }}>

      <Grid container spacing={'90px'} sx={{
        justifyContent: "center",
        pt: "125px"
      }}
      >

        <Grid item>
          <Typography variant="footerLink" >
            <Link href={'/'}>Game List</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="footerLink" >
            <Link href={'/'}>Create a game</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="footerLink" >
            <Link href={'#'}>Nothing</Link>
          </Typography>
        </Grid>

      </Grid>
      <Container maxWidth={false} sx={{
        paddingTop:'75px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap:'6px'
      }}>

        <Image src={'/assets/images/copyright.png'} alt='copyright' width={13} height={13} />
        <Typography className="copyright">Copyright 2023</Typography>
        
      </Container>
    </Container>
)
}

export default Footer