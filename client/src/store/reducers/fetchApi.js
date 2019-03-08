const defaultStore = {
    movies: [],
    loading: false,
    error: false,
    movieDetails: {}
}

export default function(state=defaultStore, action) {
    const { type, payload } = action

    switch (type) {
        case "FETCH_MOVIES_SUCCESS":
            return { ...state, movies: payload, loading: false }
        case "FETCH_MOVIES_LOADING":
            return { ...state, loading: true }
        case "FETCH_MOVIES_ERROR":
            return { ...state, loading:false, error:true }
        case "FETCH_MOVIE_DETAILS_SUCCESS":
            return { ...state, loading: false, movieDetails: payload }
        case "FETCH_MOVIE_DETAILS_LOADING":
            return { ...state, loading: true }
        case "FETCH_MOVIE_DETAILS_ERROR":
            return { ...state, loading: false, error: true }
        default:
            return state
    }
}