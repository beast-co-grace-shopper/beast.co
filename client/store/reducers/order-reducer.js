import {
  SET_ORDER,
  SET_USER_ORDERS,
  GET_ALL_ORDERS
} from '../actions/order-actions'

const initialState = {
  order: {},
  allUserOrders: [],
  allOrders: []
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER: {
      return {...state, order: action.order}
    }

    case SET_USER_ORDERS: {
      return {...state, allUserOrders: action.allUserOrders}
    }

    case GET_ALL_ORDERS: {
      return {...state, allOrders: [...action.orders]}
    }

    default:
      return state
  }
}

export default orderReducer
