import { getNews } from '../../api/news.js'

export function updateNewsData(category, search) {
    category = category || ''
    search = search || ''

    let newsData = { status: 'loading' }

    return async (dispatch) => {
        dispatch({
            type: 'UPDATE_NEWSDATA',
            newsData,
        })
        newsData = await getNews(category, search)
        newsData = newsData
        dispatch({
            type: 'UPDATE_NEWSDATA',
            newsData,
        })
    }
}
