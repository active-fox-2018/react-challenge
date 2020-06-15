const defState = {
    user: null,
    error: false,
    fav: []
}

export default function (state = defState, action) {
    const { type , data } = action
    
    switch (type) {
        case 'SET_USER':
            return {...state, user: data }
        case 'SET_ERROR':
            return {...state, error: data}
        case 'SET_FAV':
            return {...state, fav: data}
        case 'SET_NEW_FAV':
            return {...state, fav: state.fav.concat([data])}
        case 'REMOVE_FAV':
            return {...state, fav: state.fav.filter(el => String(el._id) !== String(data))}
        default:
            return state
    }
}