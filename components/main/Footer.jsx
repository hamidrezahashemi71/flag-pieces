import { Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"
import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <Container disableGutters maxWidth={false} className='footerContainer'>
      <Grid container spacing={'90px'} justifyContent={"center"} paddingTop={'125px'}>
        <Grid item>
          <Typography variant="footerLink" ><Link href={'/'}>Game List</Link></Typography>
        </Grid>
        <Grid item>
          <Typography variant="footerLink" ><Link href={'/'}>Create a game</Link></Typography>
        </Grid>
        <Grid item>
          <Typography variant="footerLink" ><Link href={'#'}>Nothing</Link></Typography>
        </Grid>
      </Grid>
      <Container maxWidth={false} sx={{
        paddingTop:'75px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap:'6px'
      }}>
        <Image src={'/assets/images/copyright.png'} width={13} height={13} />
        <Typography className="copyright">Copyright 2023</Typography>
      </Container>
    </Container>
)
}

export default Footer