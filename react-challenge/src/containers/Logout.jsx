import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { firebase } from '../api/firebase.js'

export default class Logout extends Component {

    render() {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });
        localStorage.clear();

        return (
            <Redirect to="/login" />
        )
    }
}
