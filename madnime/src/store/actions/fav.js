import my from '../../api/my'
import alertify from 'alertifyjs'

export function getFav () {
    return dispatch => {
        my({
            method: 'get',
            url: '/favs',
            headers: {
                token: localStorage.token
            }
        })
        .then(({ data }) => {
            dispatch({
                type: 'SET_FAV',
                data
            })
        })
        .catch(err => {
            dispatch({
                type: 'SET_ERROR',
                data: err.response
            })
        })
    }
}

export function addFav (data) {
    return dispatch => {
        my({
            method: 'post',
            url: '/favs',
            headers: {
                token: localStorage.token
            },
            data
        })
            .then(({ data }) => {
                alertify.message(`Added to your favorite`)
                dispatch({
                    type: 'SET_NEW_FAV',
                    data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'SET_ERROR',
                    data: err.response
                })
            })
    }
}

export function delOne (id) {
    return dispatch => {
        my({
            method: 'delete',
            url: `/favs/${id}`,
            headers: {
                token: localStorage.token
            }
        })
        .then(({ data }) => {
            alertify.error(`Removed from your favorite`)
            dispatch({
                type: 'REMOVE_FAV',
                data: id
            })
        })
        .catch(err => {
            dispatch({
                type: 'SET_ERROR',
                data: err.response
            })
        })
    }
}