import { Avatar, Link as MuiLink, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Link from 'next/link'

const Navbar = () => {
  return (
      <Container sx={{py:'24px', px:'0'}} maxWidth={false}>
        <Container maxWidth='xl' className='navContainer'>
          <Avatar />
        <Typography variant="navLink" ><Link href={'/'}>Create a game</Link></Typography>
        </Container>
      </Container>
 )
}

export default Navbar