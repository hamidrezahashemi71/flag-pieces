import { Container } from "@mui/system"
import Footer from "../components/main/Footer"
import Navbar from "../components/main/Navbar"

const MainLayout = ({children}) => {
  return (
    <Container disableGutters maxWidth={false} sx={{minHeight:'100vh'}}>
      <Container maxWidth='xl' className='mainLayout'>
        <Navbar />
        {children}
      </Container>
      <Footer />
    </Container>
)
}

export default MainLayout