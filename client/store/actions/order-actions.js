import axios from 'axios'

//ACTION TYPES
export const SET_USER_ORDERS = 'SET_ORDERS_FOR_USER'
export const SET_ORDER = 'SET_ORDER'
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

//ACTION CREATORS
export const setOrdersForUser = allUserOrders => ({
  type: SET_USER_ORDERS,
  allUserOrders
})

export const setOrder = order => ({
  type: SET_ORDER,
  order
})

export const getAllOrders = orders => ({
  type: GET_ALL_ORDERS,
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

export const fetchAllOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders/allOrders')
    dispatch(getAllOrders(data))
  } catch (err) {
    console.log(err)
  }
}
