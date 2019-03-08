import axios from 'axios'

let apiKey = '7798e4433893518fd4c8f3c229245eb6'
let link = 'https://api.themoviedb.org/3'

export function fetchMovies (page) {
    return dispatch => {
        dispatch({ type: "FETCH_MOVIES_LOADING" })
        axios
            .get(`${link}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
            .then(({ data }) => {
                dispatch({ type: "FETCH_MOVIES_SUCCESS", payload: data.results })
            })
            .catch((error) => {
                dispatch({ type: "FETCH_MOVIES_ERROR" })
            })

    }
}

export function fetchMovieDetails (id) {
    return dispatch => {
        dispatch({ type: "FETCH_MOVIE_DETAILS_LOADING" })
        axios
            .get(`${link}/movie/${id}?api_key=${apiKey}&language=en-US`)
            .then(({ data }) => {
                dispatch({ type: "FETCH_MOVIE_DETAILS_SUCCESS", payload: data })
            })
            .catch((error) => {
                dispatch({ type: "FETCH_MOVIE_DETAILS_ERROR" })
            })
    }
}