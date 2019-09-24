import {GET_AVERAGE, GET_REVIEWS_BY_ANIMAL} from '../actions/review-actions'

const initialState = {
  reviews: [],
  averages: {}
}

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_ANIMAL: {
      return {...state, reviews: [...action.reviews]}
    }

    case GET_AVERAGE: {
      return {}
    }

    default:
      return state
  }
}

export default reviewReducer
