const defaultState = {
    newsData: [{ title: 'Loading...', source: {}, publishedAt: new Date().toISOString() }],
    favoritesData: [{ title: 'Loading...', source: {}, publishedAt: new Date().toISOString() }]
}

export default function (state = defaultState, action) {
    const { type } = action
    switch (type) {
        case 'UPDATE_NEWSDATA':
            return { ...state, newsData: action.newsData }
        case 'UPDATE_FAVORITESDATA':
            return { ...state, favoritesData: action.favoritesData }
        default:
            return state
    }
}
