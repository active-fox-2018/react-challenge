import { db, firebase } from '../../api/firestore'

export function addFavorite(movie) {
    return dispatch => {
        dispatch({type: 'ADD_FAVORITE_LOADING'})
        db
            .collection('favorites')
            .doc(movie.docId)
            .update({ favorites:firebase.firestore.FieldValue.arrayUnion(movie) })
            .then((doc) => {
                dispatch({type: 'ADD_FAVORITE_SUCCESS'})

            })
            .catch((error) => {
                dispatch({type: 'ADD_FAVORITE_ERROR'})
            })
    }
}

export function createFavorite(movie) {
    return dispatch => {
        dispatch({type: 'CREATE_FAVORITE_LOADING'})
        db
            .collection('favorites')
            .add({
                email: localStorage.getItem('user'),
                favorites: [movie]
            })
            .then((doc) => {
                dispatch({type: 'CREATE_FAVORITE_SUCCESS'})
            })
            .catch((error) => {
                dispatch({type: 'CREATE_FAVORITE_ERROR'})
            })

    }
}

export function getFavorites() {
    return dispatch => {
        dispatch({ type: 'GET_FAVORITE_LOADING'})

        db
            .collection('favorites')
            .where('email', '==', localStorage.getItem('user'))
            .onSnapshot(function(querySnapshot) {
                let favorites = []
                querySnapshot.forEach((doc) => {
                    favorites = doc.data().favorites
                    let merge = [...favorites, {docId: doc.id}]
                    dispatch({ type: 'GET_FAVORITE_SUCCESS', favorites: merge})
                })

            })
    }
}