import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const DESTROY_USER = 'DESTROY_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const destroyUser = users => ({type: DESTROY_USER, users})

/**
 * THUNK CREATORS
 */
export const fetchUsersInfo = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(getAllUsers(res.data || defaultUsers))
  } catch (error) {
    console.error(error)
  }
}

export const deleteUser = userId => async dispatch => {
  try {
    // delete returns the remaining list of users...
    const res = await axios.delete(`/api/users/${userId}`)
    dispatch(destroyUser(res.data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users

    case DESTROY_USER:
      return action.users

    default:
      return state
  }
}
