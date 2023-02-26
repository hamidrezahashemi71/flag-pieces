import GameContainer from './GameContainer'
import UserSlider from '../home/UserSlider'
import SearchBox from '../home/SearchBox'
import React, { useState } from 'react'

const GameSection = ({ users, setFilteredFlags, allFlags, filteredFlags, isTextEntered }) => {

  const [chosen, setChosen] = useState(null)
  
  return (
  <>
      
      <SearchBox setFilteredFlags={(data, boolean) => setFilteredFlags(data, boolean)} allFlags={allFlags} />
    {chosen &&
      <GameContainer
        src={chosen.image ? chosen.image : process.env.DEFAULT_FLAG}
        naturalHeight={chosen.naturalHeight}
        naturalWidth={chosen.naturalWidth}
        name={chosen.name}
        useFor={'puzzle'}
        step={1}
      />
    }
      <UserSlider
        users={isTextEntered ? filteredFlags : users}
        handleClick={(data) => setChosen(data)}
        pages={Object.keys(users)}
        chosen={chosen}
      />

  </>
  )
}

export default GameSection