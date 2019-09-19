import axios from 'axios'

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const DESTROY_CATEGORY = 'DESTROY_CATEGORY'
export const MODIFY_CATEGORY = 'MODIFY_CATEGORY'

// --[ Action Creators ]---------------------------------------------------------
export const setSelectedCategory = selectedCategory => ({
  type: SET_SELECTED_CATEGORY,
  selectedCategory
})

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})

export const addCategory = category => ({
  type: ADD_CATEGORY,
  category
})

export const destroyCategory = categoryId => ({
  type: DESTROY_CATEGORY,
  categoryId
})

export const modifyCategory = category => ({
  type: MODIFY_CATEGORY,
  category
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

export const postCategory = (newCategory, history) => async dispatch => {
  try {
    const response = await axios.post('/api/categories', newCategory)
    const createdCategory = response.data

    dispatch(addCategory(createdCategory))
    history.push(`/categories/${createdCategory.id}`)
  } catch (error) {
    console.error('Failed to POST /api/categories')
  }
}

export const deleteCategory = categoryId => async dispatch => {
  try {
    await axios.delete(`/api/categories/${categoryId}`)
    dispatch(destroyCategory(categoryId))
  } catch (error) {
    console.error('Failed to DELETE /api/categories/:categoryId')
  }
}
