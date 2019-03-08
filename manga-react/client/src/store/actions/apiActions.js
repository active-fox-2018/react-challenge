import axios from '../../api/axios'

export function getData () {
    return async dispatch => {
        dispatch({type: 'GET_MANGA_LOADING'})
        try {
            let fetch = await axios({
                url: `/mangas`,
                method: 'get',
                headers: {
                    token: localStorage.token
                }
            })
            dispatch({type: 'GET_MANGA_SUCCESS', payload: fetch.data.reverse()})
        } catch (error) {
            dispatch({type: 'GET_MANGA_ERROR'})
        }
    }
}

export function fetchManga (page) {
    return async dispatch => {
        dispatch({type: 'GET_MANGA_LOADING'})
        try {
            let fetch = await axios({
                url: `https://kitsu.io/api/edge/manga?page[limit]=18&page[offset]=12`,
                method: 'get',
            })
            dispatch({type: 'FETCH_HOME_SUCCESS', payload: fetch.data.data})
        } catch (error) {
            dispatch({type: 'GET_MANGA_ERROR'})
        }
    }
}

export function searchManga (title) {
    return async dispatch => {
        dispatch({type: 'GET_MANGA_LOADING'})
        try {
            let fetch = await axios({
                url: `https://kitsu.io/api/edge/manga?filter[text]=${title}`,
                method: 'get',
            })
            dispatch({type: 'FETCH_HOME_SUCCESS', payload: fetch.data.data})
        } catch (error) {
            dispatch({type: 'GET_MANGA_ERROR'})
        }
    }
}

export function getDetail (id) {
    return async dispatch => {
        try {
            let fetch = await axios({
                url: `https://kitsu.io/api/edge/manga?filter[id]=${id}`,
                method: 'get',
            })
            dispatch({type: 'MANGA_DETAIL', payload: fetch.data.data[0]})
        } catch (error) {
            console.log(error)
        }
    }
}