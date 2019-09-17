import React from 'react'

const AnimalCard = ({animal}) => {
  return (
    <div>
      <img src={animal.photo} alt={`Image of ${animal.name}`} />
      <h1>{animal.name}</h1>
      <p>Animal review...</p>
      <p>Price: {animal.cost}</p>
    </div>
  )
}

export default AnimalCard
