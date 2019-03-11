const defaultState = {
  allFilms: [],
  watchList: [],
  film: '',
  hasErrored: false,
  isLoading: false
}

export default function (state = defaultState, action) {
  const { type, payload } = action

  switch (type) {
    case 'GET_FILMS_SUCCESS':
      return { ...state, allFilms: payload, isLoading: false }
    case 'GET_FILMS_ERROR':
      return { ...state, hasErrored: true, isLoading: false }
    case 'GET_FILMS_LOADING':
      return { ...state, isLoading: true }

    case "GET_FILM_BY_ID_SUCCESS":
      return { ...state, film: payload, isLoading: false }
    case 'GET_FILM_BY_ID_ERROR':
      return { ...state, hasErrored: true, isLoading: false }
    case 'GET_FILM_BY_ID_LOADING':
      return { ...state, isLoading: true }

    case 'ADD_TO_WATCHLIST_SUCCESS':
      return {...state, watchList: state.watchList.concat(payload)}
    case 'ADD_TO_WATCHLIST_ERROR':
      return {...state, hasErrored:true}

    case 'GET_WATCHLIST_SUCCESS':
      return {...state, watchList: payload }
    case 'GET_WATCHLIST_ERROR':
      return{...state, hasErrored:true}

    case 'REMOVE_FROM_WATCHLIST_SUCCESS':
      return {...state, watchList: payload}
    default:
      return state
  }
}