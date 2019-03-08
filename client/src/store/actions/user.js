import { db } from '../../api/firestore'


export function userLogin () {
    return {
        type: 'USER_LOGIN_SUCCESS',
        token: localStorage.getItem('token'),
        email: localStorage.getItem('email')
    }
}

export function userLoginLoading () {
    return {
        type: 'USER_LOGIN_LOADING'
    }
}

export function userLoginError() {
    return {
        type: 'USER_LOGIN_LOADING'
    }
}

export function userLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return {
        type: 'USER_LOGOUT'
    }
}