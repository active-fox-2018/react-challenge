const defaultState = {isLogin: null}

export default function (state = defaultState, action) {
    const {type} = action

    switch (type) {
        case 'LOGIN_SUCCESS':
            return {...state, isLogin: true}
        case 'LOGIN_ERROR':
            return {...state, isLogin: false}
        case 'LOGIN_LOADING':
            return {...state, loading: true}
        case 'LOGOUT_SUCCESS':
            return {...state, isLogin: false}
        case 'LOGOUT_ERROR':
            return {...state, isLogin: true}
        default:
            return state
    }
}