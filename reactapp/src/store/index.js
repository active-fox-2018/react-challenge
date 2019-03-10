import { createStore, combineReducers ,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import loginState from './reducers/loginState'

const store = createStore(
  combineReducers({loginState}),
  applyMiddleware(thunk)
)

export default store