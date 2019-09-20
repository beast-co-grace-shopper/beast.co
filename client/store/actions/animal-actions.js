import axios from 'axios'

export const SET_SELECTED_ANIMAL = 'SET_SELECTED_ANIMAL'
export const SET_ANIMALS = 'SET_ANIMALS'
export const ADD_ANIMAL = 'ADD_ANIMAL'
export const DESTROY_ANIMAL = 'DESTROY_ANIMAL'
export const MODIFY_ANIMAL = 'MODIFY_ANIMAL'
export const SEARCH_ANIMALS = 'SEARCH_ANIMALS'
export const FILTER_CATEGORIES = 'FILTER_CATEGORIES'

// --[ Action Creators ]---------------------------------------------------------
export const setSelectedAnimal = selectedAnimal => {
  return {
    type: SET_SELECTED_ANIMAL,
    selectedAnimal
  }
}

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

export const searchAnimals = animals => ({
  type: SEARCH_ANIMALS,
  animals
})

export const filterCategories = animals => ({
  type: FILTER_CATEGORIES,
  animals
})

// --[ Thunk Creators ]----------------------------------------------------------
export const fetchAnimals = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/animals')
    dispatch(setAnimals(data))
  } catch (error) {
    console.error('Failed to GET /api/animals')
  }
}

export const fetchSelectedAnimal = animalId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/animals/${animalId}`)
    dispatch(setSelectedAnimal(data))
  } catch (err) {
    console.error('Failed to GET /api/animals')
  }
}

export const searchForAnimals = searchFor => async dispatch => {
  try {
    const {data} = await axios.get('/api/animals')
    let searchResult = data.filter(animal => {
      const name = animal.name.toLowerCase()
      const search = searchFor.toLowerCase()

      return name.includes(search)
    })

    dispatch(searchAnimals(searchResult))
  } catch (error) {
    console.log(error)
    console.error('Failed to GET /api/animals')
  }
}

export const filterAnimalCategories = category => async dispatch => {
  try {
    console.log('looking for category: ', category)
    const {data} = await axios.get('/api/animals')
    console.log('all animals ', data)
    let searchResult = data.filter(function(animal) {
      let matchedCategories = animal.categories.filter(
        currCategory => currCategory.category === category
      )

      if (matchedCategories.length > 0) {
        return true
      } else {
        return false
      }
    })
    console.log('filtered categories ', searchResult)
    dispatch(filterCategories(searchResult))
  } catch (error) {
    console.log(error)
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
