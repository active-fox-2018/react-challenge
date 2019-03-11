const defaultState = {
    manga: [], 
    detail: {}, 
    error: false, 
    loading: false,
    loadingPush: false,
    homeManga: []
}

export default function (state = defaultState, action) {
    const {type, payload} = action

    switch (type) {
        case 'GET_MANGA_SUCCESS':
            return {...state, manga: payload, loading: false}
        case 'GET_MANGA_ERROR':
            return {...state, error: true, loading: false}
        case 'GET_MANGA_LOADING':
            return {...state, loading: true}
        case 'PUSH_MANGA':
            return {...state, manga: [payload, ...state.manga], loading: false}
        case 'PUSH_MANGA_LOADING' :
            return {...state, manga: [payload, ...state.manga], loadingPush: true}
        case 'MANGA_DETAIL':
            return {...state, detail: payload, loading: false}
        case 'FETCH_HOME_SUCCESS':
            return {...state, homeManga: payload, loading: false }
        case 'DELETE_MANGA':
            return {...state, manga: state.manga.filter(e => e._id !== payload._id)}
        default:
            return state
    }
}