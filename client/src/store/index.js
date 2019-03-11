import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

//reducers
import FilmsApi from './reducers/FilmsApi'
import Users from './reducers/Users'

const store = createStore(
   combineReducers({FilmsApi, Users}),
   composeWithDevTools(applyMiddleware(thunk))
)

export default store

