import jikan from '../../api/jikan'

export function sendList (num = 1) {
    return dispatch => {
        dispatch({
            type: 'SET_ANIME_LIST',
            data: []
        })
        jikan({
            method: 'get',
            url: `/top/anime/${num}`
        })
        .then( data => {
            dispatch({
                type: 'SET_QUERY',
                data: false
            })
            dispatch({
                type: 'SET_ANIME_LIST',
                data: data.data.top
            })
        })
        .catch(err => {
          dispatch({type: 'SET_ERROR', data: err})
        })
    }
}

export function search (q) {
    return dispatch => {
        dispatch({
            type: 'SET_ANIME_LIST',
            data: []
        })
        jikan({
            method: 'get',
            url: `/search/anime/?q=${q}`
        })
        .then( data => {
            dispatch({
                type: 'SET_ANIME_LIST',
                data: data.data.results
            })
            dispatch({
                type: 'SET_QUERY',
                data: true
            })
        })
        .catch(err => {
          dispatch({type: 'SET_ERROR', data: err})
        })
    }
}

export function sendDetail (id) {
    return dispatch => {
        dispatch({
            type: 'SET_ANIME_DETAIL',
            data: {}
        })
        jikan({
            method: 'get',
            url: `/anime/${id}`
        })
        .then(({ data }) => {
            dispatch({
                type: 'SET_ANIME_DETAIL',
                data
            })
        })
        .catch(err => {
            dispatch({type: 'SET_ERROR', data: err})
        })
    }
    
}

export function sendQuery (data) {
    return {
        type: 'SET_QUERY',
        data
    }
}
