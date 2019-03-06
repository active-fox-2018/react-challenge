import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
export default class Login extends Component {
    componentDidMount() {
        if(localStorage.uid) {
            return <Redirect to = '/' /> 
        }
    }
  render() {
    return (
      <div>
        <h1>THIS IS LOGIN PAGE</h1>
      </div>
    )
  }
}
