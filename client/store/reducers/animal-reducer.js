import axios from 'axios'

import {
  SET_ANIMALS,
  ADD_ANIMAL,
  DESTROY_ANIMAL,
  MODIFY_ANIMAL,
  setAnimals,
  addAnimal,
  destroyAnimal
} from '../actions/animal-actions'

// --[ Thunk Creators ]----------------------------------------------------------
export const fetchAnimals = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/animals')
    dispatch(setAnimals(data))
  } catch (error) {
    console.error('Failed to GET /api/animals')
  }
}

// export const postAnimal = (newAnimal, history) =>
//   async (dispatch) => {
//     try {
//       const response = await axios.post('/api/animals', newAnimal);
//       const createdAnimal = response.data;

//       dispatch(addAnimal(createdAnimal));
//       history.push(`/animals/${createdAnimal.id}`);
//     }
//     catch (error) {
//       console.error('Failed to POST /api/animals');
//     }
//   };

export const deleteAnimal = animalId => async dispatch => {
  try {
    await axios.delete(`/api/animals/${animalId}`)
    dispatch(destroyAnimal(animalId))
  } catch (error) {
    console.error('Failed to DELETE /api/animals/:animalId')
  }
}

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
