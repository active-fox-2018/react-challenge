export function updateNewsData(newsData) {
    return {
        type: 'UPDATE_NEWSDATA',
        newsData
    }
}

export function updateFavoritesData(favoritesData) {
    return {
        type: 'UPDATE_FAVORITESDATA',
        favoritesData
    }
}
