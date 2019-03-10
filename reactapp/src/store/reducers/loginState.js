const defaultState = {
  isLogin: false,
  name: '',
  uid: '',
  pokemons: [],
  error: false,
  loading: false
}

export default function (state = defaultState, action) {
  const {type, payload} = action
  switch (type) {
    case 'LOGIN': 
      return {
        ...state,
        isLogin: true,
        name: payload.name,
        uid: payload.uid,
        pokemons: payload.pokemons,
        loading: false
      }
    case 'LOADING_LOGIN':
      return {
        ...state, loading: true
      }
    case 'ERROR_LOGIN': 
      return {
        ...state, error: true, loading: false
      }
    case 'LOGOUT' :
      return {
        ...state,
        isLogin: false,
        name: payload.name,
        uid: payload.uid,
        pokemons: payload.pokemons,
        loading: false
      }
    default:
      return state
  }
}