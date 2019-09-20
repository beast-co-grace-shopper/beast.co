import axios from 'axios'

//ACTION TYPES
export const ADD_ANIMAL_TO_CART = 'ADD_ANIMAL_TO_CART'
export const REMOVE_ANIMAL_FROM_CART = 'REMOVE_ANIMAL_FROM_CART'
export const FETCH_CART = 'FETCH_CART'
export const REMOVE_ALL_ANIMALS = 'REMOVE_ALL_ANIMALS'
export const UPDATE_ANIMAL = 'UPDATE_ANIMAL'
export const SUBMIT_ORDER = 'SUBMIT_ORDER'

//ACTION CREATORS
export const addAnimal = animal => ({
  type: ADD_ANIMAL_TO_CART,
  animal
})

export const removeAnimal = animal => ({
  type: REMOVE_ANIMAL_FROM_CART,
  animal
})

export const fetchCart = cart => ({
  type: FETCH_CART,
  cart
})

export const removeAllAnimals = cart => ({
  type: REMOVE_ALL_ANIMALS,
  cart
})

export const updateANIMAL = animal => ({
  type: UPDATE_ANIMAL,
  animal
})

export const submitOrder = confirmation => ({
  type: SUBMIT_ORDER,
  confirmation
})

//THUNK CREATORS
export const submitCartOrder = order => async dispatch => {
  try {
    const idObj = {userId: order.userId}
    const {data} = await axios.post('/api/order', order)
    await axios.delete('/api/cart/all', idObj)
    dispatch(submitOrder(data))
  } catch (err) {
    console.log(err)
  }
}

export const addAnimalToCart = (animal, user, quantity) => async dispatch => {
  try {
    const postAnimal = {
      animalId: animal.id,
      userId: user.id,
      quantity: quantity
    }
    const {data} = await axios.post('/api/cart', postAnimal)
    dispatch(addAnimal(postAnimal))
  } catch (error) {
    console.log(error)
  }
}

export const removeAnimalFromCart = (animal, user) => async dispatch => {
  try {
    const deleteAnimal = {animalId: animal.id, userId: user.id}
    const {data} = await axios.delete('/api/cart', deleteAnimal)
    dispatch(removeAnimal(data))
  } catch (error) {
    console.log(error)
  }
}

export const fetchUserCart = user => async dispatch => {
  try {
    let id = user.id
    const {data} = await axios.get(`/api/cart/${id}`)
    dispatch(fetchCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const removeAllAnimalsFromCart = user => async dispatch => {
  try {
    await axios.delete('/api/cart/all', user)
    dispatch(fetchCart({}))
  } catch (error) {
    console.log(error)
  }
}

export const updateAnimalInCart = (
  animal,
  user,
  newQuantity
) => async dispatch => {
  try {
    const updateAnimal = {
      quantity: newQuantity,
      animalId: animal.id,
      userId: user.id
    }
    const {data} = await axios.put('/api/cart', updateAnimal)
    dispatch(updateANIMAL(data[0]))
  } catch (error) {
    console.log(error)
  }
}
