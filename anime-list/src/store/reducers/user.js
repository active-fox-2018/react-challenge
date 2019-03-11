const defaultStore = {
  isLogin: false,
  uid: null,
  email: null,
  name: null,
  favorites: [],
  loading: false,
  err: false
}

export default function (state = defaultStore, action) {
  const { type, payload } = action
  switch (type) {
    case 'CHECK_LOGIN':
      return { ...state, isLogin: payload.status, uid: payload.uid, email: payload.email, name: payload.name }

    case 'ADD_TO_FAVORITES_SUCCESS':
      return { ...state, loading: false }
    case 'ADD_TO_FAVORITES_LOADING':
      return { ...state, loading: true }
    case 'ADD_TO_FAVORITES_ERR':
      return { ...state, err: true, loading: false }

    case 'GET_FAVORITES_SUCCESS':
      return { ...state, loading: false, favorites: payload.favorites }
    case 'GET_FAVORITES_LOADING':
      return { ...state, loading: true }

    case 'REMOVE_FROM_FAVORITES_SUCCESS':
      return { ...state, loading: false }
    case 'REMOVE_FROM_FAVORITES_LOADING':
      return { ...state, loading: true }
    case 'REMOVE_FROM_FAVORITES_ERR':
      return { ...state, err: true, loading: false }

    default:
      return state
  }
}