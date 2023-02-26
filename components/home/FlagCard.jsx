import { Button, Typography } from "@mui/material"
import { useRef, useState } from "react";
import { Box } from "@mui/system"
import Image from "next/image"



const FlagCard = ({ flag, handleChooseFlag }) => {
  
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef(null)

  return (
    <Box sx={{
      height: "calc(100% - 60px)",
      position: "relative",
      marginTop: "60px",
      padding: "10px",
      width: "200px",
    }}>

      <Box sx={{
        border: "2px solid #ffffff0f",
        background: "#ffffff24",
        borderRadius: "12px",
        height: "100%",
        padding:"10px",
      }}>

        <Box sx={{
          position: "relative",
          height: "160px",
          width: "160px",
        }}>
          
            <Image
              src={imageError ? process.env.DEFAULT_FLAG : flag.image}
              style={{ objectFit: 'contain', top: '-80px' }}
              onError={() => setImageError(true)}
              alt='flag picture'
              ref={imageRef}
              fill
          />
          
        </Box>
        <Box sx={{
          position: "absolute",
          bottom: "35px",
          width: "157px",
        }} >
          
          <Typography variant='h4' component='p' sx={{
              textAlign: "center",
              mt: "15px", 
          }}>
            {flag.name}
          </Typography>
          <Button
            variant='cardButton'
            onClick={() => handleChooseFlag({
              ...flag,
              naturalWidth: imageRef.current.naturalWidth,
              naturalHeight: imageRef.current.naturalHeight
            })}>
            Choose it
          </Button>
          
        </Box>
      </Box>
    </Box>
  )

}

export default FlagCard