const defState = {
    animeList: [],
    anime: {},
    query: false,
    error: false
}

export default function (state = defState, action) {
    const { type , data } = action
    
    switch (type) {
        case 'SET_ANIME_LIST':
            return {...state, animeList: data }
        case 'SET_ANIME_DETAIL':
            return {...state, anime: data }
        case 'SET_QUERY':
            return {...state, query: data}
        case 'SET_ERROR':
            return {...state, error: data}
        default:
            return state
    }
}