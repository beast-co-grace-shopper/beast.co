import {
  SET_ANIMALS,
  ADD_ANIMAL,
  DESTROY_ANIMAL,
  MODIFY_ANIMAL
} from '../actions/animal-actions'

// --[ Animal Reducer ]-----------------------------------------------------------
const animalReducer = (prevState = [], action) => {
  switch (action.type) {
    case SET_ANIMALS: {
      return action.animals
    }

    case ADD_ANIMAL: {
      return [...prevState, action.animal]
    }

    case DESTROY_ANIMAL: {
      return prevState.filter(({id}) => id !== action.animalId)
    }

    // case MODIFY_ANIMAL: {
    //   const animalsWithoutUpdatedAnimal =
    //     prevState.filter(({id}) => id !== action.animal.id);
    //   return [...animalsWithoutUpdatedAnimal, action.animal];
    // }

    default:
      return prevState
  }
}

export default animalReducer
