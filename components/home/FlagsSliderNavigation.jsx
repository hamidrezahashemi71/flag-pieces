import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import { Box } from "@mui/system"

const FlagSliderNavigation = ({ useFor, currentPage, lastPage, goForward, goBackward }) => {
  return (
    <Box
      style={{
        display:
          (currentPage != 1 && useFor === 'backward') || (currentPage != lastPage && useFor === 'forward')
            ? 'flex' : 'none',
        border: "2px solid #ffffff0f",
        justifyContent: "center",
        background: "#ffffff24",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "12px",
        color: "#ffffff8a",
        cursor: "pointer",
        width: "100px",
      }}
      onClick={() => useFor === 'forward' ? goForward() : goBackward()}>
      {
        useFor === 'forward' ?
          <ArrowForwardIos sx={{ fontSize:"60px" }} />
            :
          <ArrowBackIos sx={{ fontSize:"60px" }}/>
      }
    </Box>
)
}

export default FlagSliderNavigation