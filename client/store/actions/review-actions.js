import axios from 'axios'

export const ADD_REVIEW = 'ADD_REVIEW'

// --[ Action Creators ]---------------------------------------------------------

export const addReview = review => ({
  type: ADD_REVIEW,
  review
})

// --[ Thunk Creators ]----------------------------------------------------------

export const postReview = review => async dispatch => {
  try {
    const {data} = await axios.post('/api/review', review)
    dispatch(addReview(data))
  } catch (error) {
    console.log(error)
    console.error('Failed to POST /api/categories')
  }
}
