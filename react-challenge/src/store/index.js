import { createStore } from 'redux'

import news from './reducers/news.js'

const store = createStore(news)

export default store
