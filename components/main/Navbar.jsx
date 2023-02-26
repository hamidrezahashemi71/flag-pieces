import { Avatar, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Link from 'next/link'

const Navbar = () => {
  return (
    <Container sx={{ py: '24px', px: '0' }} maxWidth={false}>
      
        <Container maxWidth='xl' sx={{
            background: "#000000",
            height:"68px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "space-between" ,
            alignItems: "center",
            padding: "0 48px",
            opacity: "90%",
      }}>
        
          <Avatar />
          <Typography variant="navLink" >
            <Link href={'/'}>Create a game</Link>
          </Typography>
        
        </Container>
      </Container>
 )
}

export default Navbar