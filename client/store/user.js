import axios from 'axios'
import history from '../history'
import {UserHome} from '../components/user-home'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const fetchUsersInfo = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/allInfo')
    dispatch(getAllUsers(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const update = info => async dispatch => {
  try {
    const res = await axios.put('/api/users/me', info)
    dispatch(updateUser(res.data))
  } catch (err) {
    console.log(err)
    return dispatch(getUser({error: err}))
  }
}

export const auth = (
  email,
  password,
  method,
  address,
  city,
  zip,
  state,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      address,
      city,
      zip,
      state,
      firstName,
      lastName
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
