import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// reducers
import user from './reducers/user'
import api from './reducers/api'

const store = createStore(
  combineReducers({user, api}),
  applyMiddleware(thunk))

export default store