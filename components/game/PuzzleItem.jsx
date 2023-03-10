import { Container, Grid } from "@mui/material"



const PuzzleItem = ({ handlePieceSelection, piecesNumber, gridSize, thisImage, pieceIndex, piece, step }) => {
console.log(step)
  return (
    <Grid item xs={piecesNumber / gridSize} sx={{
      backgroundPositionX: ((100 / (gridSize - 1) * (pieceIndex % gridSize))) + '%',
      backgroundPositionY: ((100 / (gridSize - 1) * Math.floor(pieceIndex / gridSize))) + '%',
      backgroundSize: gridSize * 100 + '%',
      backgroundImage: `url(${thisImage})` ,
      backgroundRepeat:'no-repeat',
      border: '1px solid white', 
    }}>

      <Container disableGutters maxWidth={false} style={{
        background: !piece.isSelected ? 'transparent' : piece.usable ? 'green' : 'red',
        cursor: step == 1 || (step === 2 && piece.usable) ? 'pointer' : 'default',
        height: '100%',
        opacity:'0.5',
        width:'100%',
        }}
        onClick={() => {
          if((step == 2 && piece.usable) || step == 1) handlePieceSelection(piece, pieceIndex)
        }}
      />
      
    </Grid>
  )
  
}

export default PuzzleItem