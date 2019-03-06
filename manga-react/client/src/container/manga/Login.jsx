import React, { Component } from 'react'
import { firebase, provider } from '../../api/firebase'
export default class Login extends Component {

    gAuth = () => {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // var token = result.credential.accessToken;
            var user = result.user;
            localStorage.setItem('uid', user.uid)
          }).catch(function(error) {
            var errorCode = error.code;
            // var errorMessage = error.message;
            // var email = error.email;
            // var credential = error.credential;
            console.log(errorCode)
          });
    } 

    render() {
    return (
      <div>
        <button onClick={this.gAuth}>Login</button>
      </div>
    )
  }
}
