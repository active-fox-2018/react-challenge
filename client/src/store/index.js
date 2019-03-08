import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import user from './reducers/user'
import fetchApi from './reducers/fetchApi'
import favorites from './reducers/favorites'
const store = createStore(combineReducers({ user, fetchApi, favorites }), composeWithDevTools(applyMiddleware(thunk)))

export default store