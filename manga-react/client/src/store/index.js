import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

//reducers
import kitsu from './reducers/kitsu'
import api from './reducers/api'
import login from './reducers/login'

const store = createStore(
        combineReducers({kitsu, api, login}),
        composeWithDevTools(applyMiddleware(thunk))
    )

export default store