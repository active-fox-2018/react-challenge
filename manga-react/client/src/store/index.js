import { createStore } from 'redux'

//reducers
import kitsu from './reducers/kitsu'

const store = createStore(kitsu)

export default store