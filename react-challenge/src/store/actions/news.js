import { getNews } from '../../api/news.js'

export function updateNewsData(category, search) {
    category = category || ''
    search = search || ''

    let newsData = []

    return async (dispatch) => {
        dispatch({
            type: 'UPDATE_NEWSDATA',
            newsData,
        })
        newsData = await getNews(category, search)
        newsData = newsData.articles
        dispatch({
            type: 'UPDATE_NEWSDATA',
            newsData,
        })
    }
}
