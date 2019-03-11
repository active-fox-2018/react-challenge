const defaultState = {
  isLoggedIn : false,
  email: '',
  errors:  {}
}

export default function (state = defaultState, action){
  const { type, payload } = action

  switch (type) {
    case 'REGISTER_SUCCESS':
      return {...state, email: payload.email, isLoggedIn:true, errors: {}}
    case 'REGISTER_ERROR':
      return {...state, errors: payload}
    case 'LOGIN_SUCCESS':
      return {...state, email: payload.email, isLoggedIn: true, errors: {}}
    case 'LOGIN_ERROR':
      return {...state, errors: payload}
    case 'AUTH_ERROR':
      return {...state, errors: 'auth token fail', isLoggedIn: false}
    case 'LOGOUT':
      return {...state, isLoggedIn: false}
    default: 
      return state
  }
}

