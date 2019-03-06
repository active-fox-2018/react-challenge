const defaultState = {
    favoritesData: []
}

export default function (state = defaultState, action) {
    const { type } = action
    switch (type) {
        case 'UPDATE_FAVORITESDATA':
            return { ...state, favoritesData: action.favoritesData }
        default:
            return state
    }
}
