import {expect} from 'chai'
import {
  SET_CATEGORIES,
  fetchCategories,
  postCategory,
  deleteCategory
} from './../actions/category-actions'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('categories thunk creators', () => {
  let store
  let mockAxios

  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchCategories', () => {
    it('eventually dispatches the SET_CATEGORIES action', async () => {
      const fakeCategories = [
        {category: 'Large'},
        {category: 'Intelligent'},
        {category: 'exotic'},
        {category: 'Bird'}
      ]
      mockAxios.onGet('/api/categories').replyOnce(200, fakeCategories)
      await store.dispatch(fetchCategories())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_CATEGORIES')
      expect(actions[0].categories).to.be.deep.equal(fakeCategories)
    })
  })
})
