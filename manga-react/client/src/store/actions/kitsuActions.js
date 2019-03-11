import { firebase, provider } from '../../api/firebase'
import axios from '../../api/axios'
import alertify from 'alertifyjs'

export function fetchData (mangaData) {
    return {
        type: 'SET_DATA',
        data: mangaData
    }
}

export function deleteManga (id) {
    return async dispatch => {
        try {
            let del = await axios({
                url: `/mangas/${id}`,
                method: 'delete',
                headers: {
                    token: localStorage.token
                }
            })
            dispatch({type: 'DELETE_MANGA', payload: del.data})
            alertify.success('Manga Deleted')
        } catch (error) {
            alertify.warning('Please Try Again!')
        }
    }
}

export function loginFirebase () {
    return dispatch => {
        return firebase.auth().signInWithPopup(provider)
            .then((result) => {
            var user = result.user;
            return axios({
                url: '/firebase-login',
                method: 'post',
                data: {
                    email: user.email,
                    name: user.displayName
                }
            })
        })
        .then(user => {
            localStorage.setItem('token', user.data.access_token)
            dispatch({type: 'LOGIN_SUCCESS'})
            alertify.success('Wellcomeback . .')
            return true
          })
        .catch(function(error) {
            dispatch({type: 'LOGIN_ERROR'})
            return false
        });
    }
}

export function logout () {
    return dispatch => {
        firebase.auth().signOut()
        .then(() => {
            dispatch({type: 'LOGOUT_SUCCESS'})
            localStorage.clear()
        })
        .catch((err) => {
            dispatch({type: 'LOGOUT_ERROR'})
        });
    }
}

export function checkLogin () {
    return dispatch => {
            if (localStorage.token) {
              dispatch({type: 'LOGIN_SUCCESS'})
            } else {
              dispatch({type: 'LOGOUT_SUCCESS'})
            }
    }
}

export function manualLogin (data) {
    return async dispatch => {
        try {
            let login = await axios({
                url: '/login',
                method: 'post',
                data: data
            })
            localStorage.setItem('token', login.data.access_token)
            dispatch({type: 'LOGIN_SUCCESS'})
            alertify.success('Wellcomeback . .')
            return true
        } catch (error) {
            alertify.error(error.response.data.msg)
            dispatch({type: 'LOGIN_ERROR'})
            return false
        }
    }
}

export function addNewManga (title, id) {
    return async dispatch => {
        try {
            let post = await axios({
                url: `/mangas`,
                method: 'post',
                headers: {
                    token: localStorage.token
                },
                data: {
                  title: title,
                  id: id
                }
              })
            dispatch({type: 'PUSH_MANGA', payload: post.data})
            alertify.success('New Manga Added')
        } catch (error) {
            console.log(error.response)
            alertify.error(error.response.data.msg)
        }
    }
  }