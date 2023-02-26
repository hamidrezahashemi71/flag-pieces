import Image from "next/image"
import Puzzle from "./Puzzle"



const ImageHolder = ({ useFor, src, gridSize, piecesNumber, puzzleMode, naturalWidth, naturalHeight, step, gameData, gameDataHandler }) => {

  const currentImageSize = { width: 324, height: 456 }
  const imageHeight = currentImageSize.width * naturalHeight / naturalWidth

  if (useFor === 'puzzle') return (
    <Puzzle
      outterLength={currentImageSize.width}
      gameDataHandler={gameDataHandler}
      piecesNumber={piecesNumber}
      puzzleHeight={imageHeight}
      puzzleMode={puzzleMode}
      gameData={gameData}
      gridSize={gridSize}
      step={step}
      src={src}
    />
  )

  return (
    < Image
      width={currentImageSize.width}
      height={imageHeight}
      alt='flag picture'
      src={src}
    />
  )

}

export default ImageHolder