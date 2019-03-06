import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

//REDUCERS
import animes from './reducers/animes'

const store = createStore(animes, composeWithDevTools())

export default store