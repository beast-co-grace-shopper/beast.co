import {SET_ORDER, SET_USER_ORDERS} from '../actions/order-actions'

const initialState = {
  order: {},
  allUserOrders: []
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER: {
      return {...state, order: action.order}
    }

    case SET_USER_ORDERS: {
      return {...state, allUserOrders: action.allUserOrders}
    }

    default:
      return state
  }
}

export default orderReducer
