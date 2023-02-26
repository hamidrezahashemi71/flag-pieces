import UserSliderNavigation from "./UserSliderNavigation"
import { Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"
import UserCard from "./UserCard"
import { useState } from "react" 

const UserSlider = ({ users, pages, handleClick }) => {
  
  const [currentPage, setCurrentPage] = useState(Number(pages[0]))

  return ( 
    <Container disableGutters maxWidth='xl' sx={{
      justifyContent: "space-around",
      width: '1199px',
      display: 'flex',
      gap: "10px",
      mt: '40px',
    }}>

      <UserSliderNavigation
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
          users && users[currentPage] ?
          users[currentPage].map((user, item, ref) => {
            return(
              <Grid key={user.name} item xs={1} sx={ref.length < 6 ? {height: '50%'} : {}}>
                <UserCard user={user} handleClick={handleClick} />
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
                No data found.
              </Typography>
            </Container>
        }
      </Grid>
      <UserSliderNavigation
          goForward={() => setCurrentPage(currentPage + 1)}
          currentPage={currentPage}
          lastPage={pages.length}
          useFor='forward'
      />
      
    </Container>
)
}

export default UserSlider