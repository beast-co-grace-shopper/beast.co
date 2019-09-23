import axios from 'axios'

//ACTION TYPES
export const SET_USER_ORDERS = 'SET_ORDERS_FOR_USER'
export const SET_ORDER = 'SET_ORDER'

//ACTION CREATORS
export const setOrdersForUser = allUserOrders => ({
  type: SET_USER_ORDERS,
  allUserOrders
})

export const setOrder = order => ({
  type: SET_ORDER,
  order
})

//THUNK CREATORS
export const fetchOrdersForUser = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/orders`)
    dispatch(setOrdersForUser(data))
  } catch (error) {
    console.error('Failed to GET /api/users/:userId/orders')
  }
}
