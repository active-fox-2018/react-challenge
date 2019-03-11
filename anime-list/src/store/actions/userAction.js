import { firebase, db } from '../../api/firebase'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500
})

export function checkLogin() {
  return dispatch => {
    dispatch({type: 'CHECK_LOGIN', payload: {status: false}})
    // return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dispatch(getFavorites(user.uid))
          dispatch({type: 'CHECK_LOGIN', payload: {uid: user.uid, name: user.displayName, email: user.email, status: true}})
        } else {
          dispatch({type: 'CHECK_LOGIN', payload: {status: false}})
        }
        // resolve()
      });
    // })
  }
}

export function logout() {
  return dispatch => {
    dispatch({type: 'CHECK_LOGIN', payload: {status: true}})
    firebase.auth().signOut()
      .then(function() {
        Toast.fire({
          type: 'success',
          title: 'Signed out successfully'
        })
        dispatch({type: 'CHECK_LOGIN', payload: {uid: null, name: null, email: null, status: false}})
      })
      .catch(function(error) {
        dispatch({type: 'CHECK_LOGIN', payload: {status: true}})
      });
  }
}

export function addToFavorites(data) {
  return dispatch => {
    dispatch({type: 'ADD_TO_FAVORITES_LOADING'})
    db.collection("favorites").add(data)
      .then(() => {
        Toast.fire({
          type: 'success',
          title: 'Successfully add to favorites'
        })
        dispatch({type: 'ADD_TO_FAVORITES_SUCCESS'})
      })
      .catch((err) => {
        dispatch({type: 'ADD_TO_FAVORITES_ERR'})
      })
  }
}

export function getFavorites(uid) {
  return dispatch => {
    dispatch({type: 'GET_FAVORITES_LOADING'})
    db.collection('favorites').where("uid", "==", uid)
      .onSnapshot(querySnapshot => {
        let result = []
        querySnapshot.forEach(doc => {
          result.push({_id: doc.id, ...doc.data()})
        })
        dispatch({type: 'GET_FAVORITES_SUCCESS', payload: {favorites: result}})
      })
  }
}

export function removeFromFavorites(id) {
  return dispatch => {
    dispatch({type: 'REMOVE_FROM_FAVORITES_LOADING'})
    let favorite = db.collection("favorites").doc(id);
    favorite
      .delete()
      .then(() => {
        Toast.fire({
          type: 'success',
          title: 'Successfully remove from favorites'
        })
        dispatch({type: 'REMOVE_FROM_FAVORITES_SUCCESS'})
      })
      .catch((err) => {
        dispatch({type: 'REMOVE_FROM_FAVORITES_ERR'})
      })
  }
}