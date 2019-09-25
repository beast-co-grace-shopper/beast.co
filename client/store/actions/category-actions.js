import axios from 'axios'

export const SET_CATEGORIES = 'SET_CATEGORIES'

// --[ Action Creators ]---------------------------------------------------------
export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})

// --[ Thunk Creators ]----------------------------------------------------------
export const fetchCategories = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/categories')
    dispatch(setCategories(data))
  } catch (error) {
    console.error('Failed to GET /api/categories')
  }
}
