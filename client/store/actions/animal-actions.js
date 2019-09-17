export const SET_SELECTED_ANIMAL = 'SET_SELECTED_ANIMAL'
export const SET_ANIMALS = 'SET_ANIMALS'
export const ADD_ANIMAL = 'ADD_ANIMAL'
export const DESTROY_ANIMAL = 'DESTROY_ANIMAL'
export const MODIFY_ANIMAL = 'MODIFY_ANIMAL'

// --[ Action Creators ]---------------------------------------------------------
export const setSelectedAnimal = selectedAnimal => ({
  type: SET_SELECTED_ANIMAL,
  selectedAnimal
})

export const setAnimals = animals => ({
  type: SET_ANIMALS,
  animals
})

export const addAnimal = animal => ({
  type: ADD_ANIMAL,
  animal
})

export const destroyAnimal = animalId => ({
  type: DESTROY_ANIMAL,
  animalId
})

export const modifyAnimal = animal => ({
  type: MODIFY_ANIMAL,
  animal
})
