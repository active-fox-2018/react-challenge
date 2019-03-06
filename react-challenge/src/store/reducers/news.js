const defaultState = {
    newsData: { status: 'loading' },
}

export default function (state = defaultState, action) {
    const { type } = action
    switch (type) {
        case 'UPDATE_NEWSDATA':
            return { ...state, newsData: action.newsData }
        default:
            return state
    }
}
