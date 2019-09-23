import SUBMIT_ORDER from '../actions/cart-actions'

const initialState = {
  order: {},
  allOrders: []
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ORDER: {
      return {...state, order: action.order}
    }

    default:
      return state
  }
}

export default orderReducer
