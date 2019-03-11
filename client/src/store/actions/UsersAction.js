import axios from 'axios'

const baseURL = 'http://localhost:3001'

export function register(user) {
  return dispatch => {
    axios
      .post(`${baseURL}/register`, {
        email: user.email,
        password: user.password
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        dispatch({ type: 'REGISTER_SUCCESS', payload: data.data.email })
      })
      .catch(({ response }) => {
        console.error(response.data.err.errors)
        response.data.err.errors ? dispatch({ type: 'REGISTER_ERROR', payload: response.data.err.errors }) : dispatch({ type: 'REGISTER_ERROR', payload: response.data.message })
      })
  }
}

export function login(user){
  return dispatch => {
    axios
      .post(`${baseURL}/login`, {
        email: user.email,
        password: user.password
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        dispatch({type: 'LOGIN_SUCCESS', payload: data.data.email})
      })
      .catch(({response}) => {
        console.error(response)
        dispatch({type: 'LOGIN_ERROR', payload: {message: response.data.message}})
      })
  }
}

export function authenticateToken(){
  return dispatch => {
    axios
      .get(`${baseURL}/authToken`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        dispatch({type: 'LOGIN_SUCCESS', payload: data.data})
      })
      .catch((err) => {
        console.error(err)
        dispatch({type: 'LOGIN_ERROR'})
      })
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }
}