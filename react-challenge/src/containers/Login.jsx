import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { firebase, provider } from '../api/firebase.js'

export default class Login extends Component {
    state = {
        redirect: false
    }

    login = (e) => {
        e.preventDefault()
        let self = this
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            localStorage.setItem('token', Math.random().toString())
            self.setState({ redirect: true })
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/" />)
        }

        return (
            <div className="container p-1" style={{ 'textAlign': 'center' }}>
                <form onSubmit={this.login}>
                    <input className="btn btn-primary" type="submit" value="Login" />
                </form>
            </div>
        )
    }
}
