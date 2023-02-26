import { Button, Typography } from "@mui/material"
import { useRef, useState } from "react";
import { Box } from "@mui/system"
import Image from "next/image"

const UserCard = ({ user, handleClick }) => {

  const [imageError, setImageError] = useState(false);

  const imageRef = useRef(null)

  return (
    <Box sx={{
      width: "200px",
      height: "calc(100% - 60px)",
      padding: "10px",
      marginTop: "60px",
      position: "relative",
    }}>
      <Box className='userCardBox'>
          <Box className='userCardImageBox'>
            <Image
              src={imageError ? process.env.DEFAULT_FLAG : user.image}
              onError={() => setImageError(true)}
              alt='flag picture'
              fill
              style={{ objectFit: 'contain', top: '-80px' }}
              ref={imageRef}
            />
          </Box>
        <Box className='userCardFooter' >
          <Typography variant='h4' component='p' className="userCardName">{user.name}</Typography>
          <Button
            variant='cardButton'
            onClick={() => handleClick({
              ...user,
              naturalWidth: imageRef.current.naturalWidth,
              naturalHeight: imageRef.current.naturalHeight
            })}> Choose it </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default UserCard