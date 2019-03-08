import my from '../../api/my'
import { firebase } from '../../api/firebase'
import alertify from 'alertifyjs'

export function register (data) {
    return dispatch => {
        return my({
            method: 'post',
            url: '/users',
            data
        })
        .then(({ data }) => {
            dispatch({
                type: 'SET_USER',
                data: data.data
            })
            localStorage.setItem('token', data.token)
            alertify.message(`Welcome...`)
            return true
        })
        .catch(err => {
            dispatch({
                type: 'SET_ERROR',
                data: err.response
            })
            alertify.error(`${err.response.data.msg}`)
            return false
        })
    }
}

export function login (data) {
    return dispatch => {
        return my({
            method: 'post',
            url: '/users/login',
            data
        })
        .then(({ data }) => {
            dispatch({
                type: 'SET_USER',
                data: data.data
            })
            localStorage.setItem('token', data.token)
            alertify.message(`Welcome...`)
            return true
        })
        .catch(err => {
            dispatch({
                type: 'SET_ERROR',
                data: err.response
            })
            alertify.error(`${err.response.data.msg}`)
            return false
        })
    }
}

export function gooSign (input) {
    return dispatch => {
       return my({
            method: 'post',
            url: '/users/gooSign',
            data: input
        })
        .then(({ data }) => {
            dispatch({
                type: 'SET_USER',
                data: data.data
            })
            localStorage.setItem('token', data.token)
            alertify.message(`Welcome...`)
            return true
        })
        .catch(err => {
            dispatch({
                type: 'SET_ERROR',
                data: err.response
            })
            alertify.error(`Ooopss something went wrong`)
            return false
        })
    }
}

export function logout () {
   return dispatch => {
        localStorage.removeItem('token')
        alertify.message(`Byee.. :(`)
        dispatch({
            type: 'SET_USER',
            data: null
        })
        dispatch({
            type: 'SET_FAV',
            data: null
        })

        firebase.auth().signOut()
            .then(function() {
            })
            .catch(function(error) {
            })
   }
}

export function findOne () {
    return dispatch => {
        my({
            method: 'get',
            url: '/users',
            headers: {
                token: localStorage.token
            }
        })
        .then(({ data }) => {
            dispatch({
                type: 'SET_USER',
                data
            })
        })
        .catch((error) => {
            alertify.error(`Oops something went wrong`)
            dispatch({
                type: 'SET_ERROR',
                data: error
            })
        })
    }
}

export function removeErr () {
    return {
        type: 'SET_ERROR',
        data: null
    }
}