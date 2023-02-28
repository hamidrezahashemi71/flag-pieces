import { toast } from "react-toastify"
import PuzzleItem from "./PuzzleItem"
import Loading from "../main/Loading"
import { Grid } from "@mui/material"
import { useEffect } from "react"

const Puzzle = ({ outterLength, gameDataHandler, piecesNumber, puzzleHeight, flagMode, gameData, gridSize, step, src }) => {

  useEffect(() => {
    if(flagMode !== 'usable') createPuzzle()
  }, [])

  useEffect(() => {
    if(flagMode !== 'usable') createPuzzle()
  }, [piecesNumber])

  // populating pieces array for gameData for the first time
  const createPuzzle = () => {
    const clone = []
    for (let i = 0; i < piecesNumber; i++) {
      clone.push({
        usable: true,
        isSelected: false,
      })
    }
    gameDataHandler({ ...gameData, pieces: clone })
  }

  // selecting and deselecting unusable pieces functionlity and change pieces array in gameData
  const handlePieceSelection = (item, index) => {
    const clone = [...gameData.pieces]
    if (step === 1) {
      const unusableLength = clone.filter(item => !item.usable).length
      if (unusableLength + 1 == piecesNumber && !item.isSelected)
        return toast.error("You can't choose all pieces!")
      clone[index]['isSelected'] = !clone[index]['isSelected']
      clone[index]['usable'] = !clone[index]['usable']
      return gameDataHandler({...gameData, pieces: clone})
    }
    clone[index]['isSelected'] = !clone[index]['isSelected']
    gameDataHandler({ ...gameData, pieces: clone })
  }

  if (!gameData.pieces) return <Loading />
  return (
    <Grid container columns={piecesNumber} sx={{
      gridTemplateRows: puzzleHeight / gridSize,
      width: outterLength,
      height: puzzleHeight
      }}
    >

    {
      gameData.pieces.map((piece, i) => {
        return (
          <PuzzleItem
            handlePieceSelection={(item, index) => handlePieceSelection(item, index)}
            piecesNumber={piecesNumber}
            gridSize={gridSize}
            thisImage={src}
            pieceIndex={i}
            piece={piece}
            step={step}
          />
        )
      })
      }
      
    </Grid>
  )
  
}

export default Puzzle