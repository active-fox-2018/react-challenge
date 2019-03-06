export function sendList (data) {
    return {
        type: 'SET_ANIME_LIST',
        data
    }
}

export function sendDetail (data) {
    return {
        type: 'SET_ANIME_DETAIL',
        data
    }
}