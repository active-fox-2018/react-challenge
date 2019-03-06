import React, { Component } from 'react'
import logo from '../../logo.svg';
import Login from './Login'
export default class Navbar extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Kitsu React</h3>
        <Login />
      </header>
    )
  }
}