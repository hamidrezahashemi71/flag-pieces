import FlagSlider from '../home/FlagsSlider'
import GameContainer from './GameContainer'
import SearchBox from '../home/SearchBox'
import React, { useState } from 'react'



const GameSection = ({ allFlags, setFilteredFlags, flags, filteredFlags, isTextEntered }) => {

  const [chosenFlag, setChosenFlag] = useState(null)
  
  return (
  <>
      
      <SearchBox
        setFilteredFlags={(data, boolean) => setFilteredFlags(data, boolean)}
        allFlags={allFlags}
      />
    {chosenFlag &&
      <GameContainer
        src={chosenFlag.image ? chosenFlag.image : process.env.DEFAULT_FLAG}
        naturalHeight={chosenFlag.naturalHeight}
        naturalWidth={chosenFlag.naturalWidth}
        name={chosenFlag.name}
        useFor={'puzzle'}
        step={1}
      />
    }
      <FlagSlider
        finalFlags={isTextEntered ? filteredFlags : flags}
        handleChooseFlag={(data) => setChosenFlag(data)}
        pages={Object.keys(flags)}
      />

  </>
  )
  
}

export default GameSection