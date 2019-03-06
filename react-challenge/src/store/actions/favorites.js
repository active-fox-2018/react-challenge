import * as favorites from '../../api/favorites.js'

export function updateFavoritesData() {
    let favoritesData = [{ status: 'loading' }]

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
