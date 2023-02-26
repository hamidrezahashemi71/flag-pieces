import { toast } from "react-toastify"
import PuzzleItem from "./PuzzleItem"
import Loading from "../main/Loading"
import { Grid } from "@mui/material"
import { useEffect } from "react"

const Puzzle = ({ puzzleHeight, gridSize, puzzleMode, piecesNumber, src, outterLength, step, gameData, gameDataHandler }) => {
  
  useEffect(() => {
    if(puzzleMode !== 'usable') createPuzzle()
  }, [])

  useEffect(() => {
    if(puzzleMode !== 'usable') createPuzzle()
  }, [piecesNumber])

  // populating pieces array for gameData
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

  // selecting and deselecting unusable pieces functionlity
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
      width: outterLength, height: puzzleHeight
      }}
    >

    {
      gameData.pieces.map((piece, i) => {
        return (
          <PuzzleItem
            handlePieceSelection={(item, index) => handlePieceSelection(item, index)}
            outterLength={outterLength}
            piecesNumber={piecesNumber}
            key={outterLength + i}
            gridSize={gridSize}
            thisImage={src}
            thisIndex={i}
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