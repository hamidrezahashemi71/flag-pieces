import Image from "next/image"
import Puzzle from "./Puzzle"



const ImageHolder = ({ gameDataHandler, piecesNumber, gridSize, naturalHeight, naturalWidth, flagMode, gameData, useFor, src, step }) => {

  const currentImageSize = { width: 324, height: 456 }
  const imageHeight = currentImageSize.width * naturalHeight / naturalWidth

  if (useFor === 'game') return (
    <Puzzle
      outterLength={currentImageSize.width}
      gameDataHandler={gameDataHandler}
      piecesNumber={piecesNumber}
      puzzleHeight={imageHeight}
      flagMode={flagMode}
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