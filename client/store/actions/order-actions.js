import axios from 'axios'

//ACTION TYPES
const SET_ORDERS_FOR_USER = 'SET_ORDERS_FOR_USER'

//ACTION CREATORS
export const setOrdersForUser = orders => ({
  type: SET_ORDERS_FOR_USER,
  orders
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
