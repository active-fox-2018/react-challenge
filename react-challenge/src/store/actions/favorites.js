import * as favorites from '../../api/favorites.js'

export function updateFavoritesData() {
    let favoritesData = []

    return async (dispatch) => {
        dispatch({
            type: 'UPDATE_FAVORITESDATA',
            favoritesData
        })
        favoritesData = await favorites.get()
        dispatch({
            type: 'UPDATE_FAVORITESDATA',
            favoritesData
        })
    }
}
