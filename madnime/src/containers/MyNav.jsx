import React, { Component } from 'react'
import logo from '../logo.svg';
import {
  Link
} from 'react-router-dom'

export default class MyNav extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar my-nav sticky-top navbar-light pb-0">
            <span>
                <img src={logo} className="App-logo mb-3" alt="logo" />
                  <h1 className="navbar-brand"> <Link  style={{ color: '#34495E'}} to="/"> Madnime</Link></h1>
            </span>

            <span className="row ">
              <h6 className="col my-nav-btn">Register</h6>
              <h6 className="col my-nav-btn">Login</h6>
              {/* <h6 className="col">Sign out</h6> */}
            </span>

        </nav>
      </React.Fragment>
    )
  }
}
