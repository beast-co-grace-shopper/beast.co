import {SET_CATEGORIES} from '../actions/category-actions'

// --[ Category Reducer ]-----------------------------------------------------------
const categoryReducer = (prevState = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return action.categories
    }

    default:
      return prevState
  }
}

export default categoryReducer
