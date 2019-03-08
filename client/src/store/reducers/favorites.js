const defaultStore = {
    favorites: [],
    loading: false,
    error: false
}

export default function(state=defaultStore, action) {
    const { type, favorites } = action

    switch (type) {
        case 'ADD_FAVORITE_SUCCESS':
            return { ...state, loading: false } 
        case 'ADD_FAVORITE_LOADING':
            return { ...state, loading: true }
        case 'ADD_FAVORITE_ERROR':
            return { ...state, loading: false, error: true }
        case 'CREATE_FAVORITE_SUCCESS':
            return { ...state, favorites: favorites, loading: false } 
        case 'CREATE_FAVORITE_LOADING':
            return { ...state, loading: true }
        case 'CREATE_FAVORITE_ERROR':
            return { ...state, loading: false, error: true }
        case 'GET_FAVORITE_SUCCESS':
            return { ...state, favorites: favorites, loading: false } 
        case 'GET_FAVORITE_LOADING':
            return { ...state, loading: true }
        case 'GET_FAVORITE_ERROR':
            return { ...state, loading: false, error: true }
        default:
            return state
    }
}