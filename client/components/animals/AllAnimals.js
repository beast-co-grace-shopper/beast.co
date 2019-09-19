import React from 'react'

import AnimalCard from './AnimalCard'

// --[ All Animals ]-----------------------------------------------------------
//
// This component is used to render the list of all animals. Note that list may
// be either filtered or the result of a search. In other words, it may
// not actually represent ALL animals in the database
//
const AllAnimals = ({animals}) => {
  return (
    <div>
      <h1>ALL ANIMALS</h1>
      <div>
        {animals && animals.length
          ? animals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))
          : 'There are no animals in the database...'}
      </div>
    </div>
  )
}

export default AllAnimals
