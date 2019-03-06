import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import news from './reducers/news.js'
import favorites from './reducers/favorites.js'

const store = createStore(
    combineReducers({ news, favorites }),
    applyMiddleware(thunk)
)

export default store
