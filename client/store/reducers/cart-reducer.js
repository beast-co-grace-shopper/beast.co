import {
  ADD_ANIMAL_TO_CART,
  REMOVE_ANIMAL_FROM_CART,
  FETCH_CART,
  REMOVE_ALL_ANIMALS,
  UPDATE_ANIMAL
} from '../actions/cart-actions'

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CART: {
      return action.cart
    }

    case ADD_ANIMAL_TO_CART: {
      return [...state, action.animal]
    }

    case REMOVE_ANIMAL_FROM_CART: {
      return state.filter(cartItem => cartItem.animal.id !== action.animal.id)
    }

    case REMOVE_ALL_ANIMALS: {
      return action.cart
    }

    case UPDATE_ANIMAL: {
      const cartItemsWithNoUpdate = state.filter(
        cartItem => cartItem.animalId !== action.animal.animalId
      )

      return [...cartItemsWithNoUpdate, action.animal]
    }

    default:
      return state
  }
}

export default cartReducer
