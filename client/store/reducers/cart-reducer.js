import {
  ADD_ANIMAL_TO_CART,
  REMOVE_ANIMAL_FROM_CART,
  FETCH_CART,
  REMOVE_ALL_ANIMALS,
  UPDATE_ANIMAL,
  SUBMIT_ORDER
} from '../actions/cart-actions'

import {SET_ORDER} from '../actions/order-actions'

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CART: {
      return action.cart
    }

    case ADD_ANIMAL_TO_CART: {
      return action.animal
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

    case SUBMIT_ORDER:
    case SET_ORDER: {
      return []
    }

    default:
      return state
  }
}

export default cartReducer
