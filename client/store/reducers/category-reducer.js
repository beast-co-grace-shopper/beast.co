import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  DESTROY_CATEGORY,
  MODIFY_CATEGORY
} from '../actions/category-actions'

// --[ Category Reducer ]-----------------------------------------------------------
const categoryReducer = (prevState = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return action.categories
    }

    case ADD_CATEGORY: {
      return [...prevState, action.category]
    }

    case DESTROY_CATEGORY: {
      return prevState.filter(({id}) => id !== action.categoryId)
    }

    case MODIFY_CATEGORY: {
      const categoriesWithoutUpdatedCategory = prevState.filter(
        ({id}) => id !== action.category.id
      )
      return [...categoriesWithoutUpdatedCategory, action.category]
    }

    default:
      return prevState
  }
}

export default categoryReducer
