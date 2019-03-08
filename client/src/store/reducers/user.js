const defaultState = {
    token: null,
    email: null,
    userLoginLoading: false,
    userLoginError: false,
    userLoginSuccess: false
}

export default function (state=defaultState, action) {
    const { type, token, email } = action

    switch (type) {
        case 'USER_LOGIN_LOADING':
            return { ...state, userLoginLoading: true }
        case 'USER_LOGIN_ERROR' :
            return { ...state, userLoginError: true, userLoginLoading: false }
        case 'USER_LOGIN_SUCCESS' :
            return { ...state, userLoginLoading: false, userLoginSuccess: true, token, email } 
        case 'USER_LOGOUT' :
            return { ...state, userLoginSuccess: false}
        default:
            return state
    }
}