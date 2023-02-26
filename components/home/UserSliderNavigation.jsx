import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import { Box } from "@mui/system"

const UserSliderNavigation = ({ useFor, currentPage, lastPage, goForward, goBackward }) => {
  return (
    <Box
      className=''
      style={{
        display:
          (currentPage != 1 && useFor === 'backward') || (currentPage != lastPage && useFor === 'forward')
            ? 'flex' : 'none',
        background: "#ffffff24",
        width: "100px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        border: "2px solid #ffffff0f",
        color: "#ffffff8a",
        cursor: "pointer",
      }}
      onClick={() => useFor === 'forward' ? goForward() : goBackward()}>
      {
        useFor === 'forward' ?
          <ArrowForwardIos className="" />
            :
          <ArrowBackIos className="sliderNavigationIcon" />
      }
    </Box>
)
}

export default UserSliderNavigation