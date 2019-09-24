import axios from 'axios'

export const ADD_REVIEW = 'ADD_REVIEW'
export const GET_AVERAGE = 'GET_AVERAGE'
export const GET_REVIEWS_BY_ANIMAL = 'GET_REVIEWS_BY_ANIMAL'

// --[ Action Creators ]---------------------------------------------------------

export const addReview = review => ({
  type: ADD_REVIEW,
  review
})

export const getReviewByAnimal = reviews => ({
  type: GET_REVIEWS_BY_ANIMAL,
  reviews
})

export const setAverages = (id, avg) => ({
  type: GET_AVERAGE,
  id,
  avg
})

// --[ Thunk Creators ]----------------------------------------------------------

export const postReview = review => async dispatch => {
  try {
    await axios.post('/api/review', review)
  } catch (error) {
    console.log(error)
    console.error('Failed to POST /api/categories')
  }
}

export const getReviewByAnimalId = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/review/${id}`)

    console.log(data)

    dispatch(getReviewByAnimal(data))
  } catch (e) {
    console.log(e)
  }
}

export const getAverageRating = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/review/average/${id}`)

    let sum = data.reduce(function(total, review) {
      return Number(review.rating) + total
    }, 0)

    let average = sum / data.length

    console.log('this is the average', average)

    dispatch(setAverages(id, average))

    // return average;
  } catch (e) {
    console.log(e)
  }
}
