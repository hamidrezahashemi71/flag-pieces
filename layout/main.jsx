import Navbar from "../components/main/Navbar"
import Footer from "../components/main/Footer"
import { Container } from "@mui/system"

const MainLayout = ({ children }) => {
  
  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight:'100vh' }}>
      <Container maxWidth='xl' sx={{ minHeight: "1800px" }}>
        <Navbar />
        {children}
      </Container>
      <Footer />
    </Container>
  )
  
}

export default MainLayout