const defState = {
    animeList: [],
    anime: {}
}

export default function (state = defState, action) {
    const { type , data } = action
    switch (type) {
        case 'SET_ANIME_LIST':
            return {...state, animeList: data }
        case 'SET_ANIME_DETAIL':
            return {...state, anime: data }
        case 'SET_STATE':
            return {...state, ...data }
        default:
            return state
    }
}