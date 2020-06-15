import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

//REDUCERS
import animes from './reducers/animes'
import user from './reducers/user'

const store = createStore(
    combineReducers({ animes, user }), 
    composeWithDevTools(applyMiddleware(thunk))
)

export default store