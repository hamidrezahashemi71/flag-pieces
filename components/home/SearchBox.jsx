import { TextField } from "@mui/material"
import { Container } from "@mui/system"



const SearchBox = ({ setFilteredFlags, allFlags }) => {

  // search input functionality
  const find = (text) => setFilteredFlags(allFlags.filter((value) => value.flagName.toLowerCase().includes(text)), !!text)

  return (
    <Container maxWidth={'xl'} disableGutters sx={{ my: '30px' }}>
      
      <TextField
        onChange={(e) => find(e.currentTarget.value)}
        placeholder='Enter name to search...'
      />
      
    </Container>
  )

}

export default SearchBox