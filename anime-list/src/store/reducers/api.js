const defaultState = {
  animes: [],
  anime: {},
  loading: false,
  err: false
}

export default function (state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case 'GET_TOP_ANIMES_SUCCESS':
      return { ...state, animes: payload.animes, loading: false }
    case 'GET_TOP_ANIMES_LOADING':
      return { ...state, loading: true }
    case 'GET_TOP_ANIMES_ERR':
      return { ...state, err: true, loading: false }

    case 'GET_ANIME_DETAIL_SUCCESS':
      return { ...state, anime: payload.anime, loading: false }
    case 'GET_ANIME_DETAIL_LOADING':
      return { ...state, loading: true }
    case 'GET_ANIME_DETAIL_ERR':
      return { ...state, err: true, loading: false }

    case 'SEARCH_SUCCESS':
      return { ...state, animes: payload.animes, loading: false }
    case 'SEARCH_LOADING':
      return { ...state, loading: true }
    case 'SEARCH_ERR':
      return { ...state, err: true, loading: false }

    default:
      return state
  }
}