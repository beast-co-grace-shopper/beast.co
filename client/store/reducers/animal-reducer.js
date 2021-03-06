import {
  SET_ANIMALS,
  ADD_ANIMAL,
  DESTROY_ANIMAL,
  SEARCH_ANIMALS,
  FILTER_CATEGORIES,
  MODIFY_ANIMAL,
  SET_SELECTED_ANIMAL
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

    case SEARCH_ANIMALS: {
      return action.animals
    }

    case FILTER_CATEGORIES: {
      return action.animals
    }

    case DESTROY_ANIMAL: {
      return prevState.filter(({id}) => id !== action.animalId)
    }

    case SET_SELECTED_ANIMAL: {
      return [action.selectedAnimal]
    }

    // case MODIFY_ANIMAL: {
    //   const animalsWithoutUpdatedAnimal =
    //     prevState.filter(({id}) => id !== action.animal.id);
    //   return [...animalsWithoutUpdatedAnimal, action.animal];
    // }

    case MODIFY_ANIMAL: {
      const newState = prevState.filter(({id}) => id !== action.animal.id)
      return [...newState, action.animal]
    }

    default:
      return prevState
  }
}

export default animalReducer
