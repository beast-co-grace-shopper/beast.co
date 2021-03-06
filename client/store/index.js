import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './admin-user'
import animals from './reducers/animal-reducer'
import categories from './reducers/category-reducer'
import cart from './reducers/cart-reducer'
import orders from './reducers/order-reducer'
import reviews from './reducers/review-reducer'

const reducer = combineReducers({
  animals,
  reviews,
  cart,
  categories,
  orders,
  user,
  users
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './admin-user'
export * from './actions/animal-actions'
export * from './actions/category-actions'
export * from './actions/cart-actions'
export * from './actions/review-actions'
export * from './actions/order-actions'
export * from './actions/review-actions'
