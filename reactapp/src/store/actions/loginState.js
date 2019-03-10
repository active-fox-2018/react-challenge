import { firebase, db, provider } from '../../api/firestore'

export function login ({type}) {
  return dispatch => {
    let result = []
    dispatch({type: 'LOADING_LOGIN'})
    switch (type) {
      case 'first':
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithPopup(provider)
        .then((resultUser)=> {
          let uid = resultUser.user.uid
          db.collection("favorites")
            .where('uid', '==', uid)
            .onSnapshot((docs)=> {
              result = []
            docs
              .forEach(doc => {
                result.push({id: doc.id, pokemon: doc.data().pokemon})
              })
            dispatch({
              type: 'LOGIN',
              payload: {
                name: resultUser.user.displayName,
                uid: resultUser.user.uid,
                pokemons: result,
              }
            })
            localStorage.setItem('token', resultUser.user.uid)
            resolve()
          })
        }).catch(function(error) {
          console.log(error)
          localStorage.removeItem('token')
          reject(error)
        })
      })
      case 'reload': 
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const displayName = user.displayName
          let uid = user.uid
          db.collection("favorites")
            .where('uid', '==', uid)
            .onSnapshot((docs)=> {
              result = []
              docs
                .forEach(doc => {
                  result.push({id: doc.id, pokemon: doc.data().pokemon})
                })
              dispatch({
                type: 'LOGIN',
                payload: {
                  name: displayName,
                  uid: uid,
                  pokemons: result,
                }
              })
            })
        } else {
          localStorage.removeItem('token')
        }
      })
      break

      case 'logout':
      dispatch({
        type: 'LOGOUT',
        payload: {
          name: '',
          uid: '',
          pokemons: '',
        }
      })
      localStorage.removeItem('token')
      break
      default:
        break;
    }
  }
}