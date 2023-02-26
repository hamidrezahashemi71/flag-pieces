import PuzzleItem from "./PuzzleItem"
import Loading from "../main/Loading"
import { Grid } from "@mui/material"
import { useEffect } from "react"

const Puzzle = ({ puzzleHeight, gridSize, puzzleMode, piecesNumber, src, outterLength, step, parentData, setParentData }) => {
  
  useEffect(() => {
    if(puzzleMode !== 'usable') createPuzzle()
  }, [])

  useEffect(() => {
    if(puzzleMode !== 'usable') createPuzzle()
  }, [piecesNumber])

  const createPuzzle = () => {

    const clone = []
    for (let i = 0; i < piecesNumber; i++) {
      clone.push({
        usable: true,
        isSelected: false,
      })
    }
    setParentData({ ...parentData, pieces: clone })
    
  }


  const handlePieceSelection = (item, index) => {

    const clone = [...parentData.pieces]
    if (step === 1) {
      const unusableLength = clone.filter(item => !item.usable).length
      if(unusableLength +1 == piecesNumber && !item.isSelected) return
      clone[index]['isSelected'] = !clone[index]['isSelected']
      clone[index]['usable'] = !clone[index]['usable']
      return setParentData({...parentData, pieces: clone})
    }
    clone[index]['isSelected'] = !clone[index]['isSelected']
    setParentData({ ...parentData, pieces: clone })
    
  }

  if (!parentData.pieces) return <Loading />
  return (
    <Grid container columns={piecesNumber} sx={{
      gridTemplateRows: puzzleHeight / gridSize,
      width: outterLength, height: puzzleHeight
      }}
    >
    {
      parentData.pieces.map((piece, i) => {
        return (
          <PuzzleItem
            handleSelect={(item, index) => handlePieceSelection(item, index)}
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