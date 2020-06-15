import React, { Component } from 'react'
import logo from '../logo.svg';
import { connect } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import Search from './mini/Search'
import { bindActionCreators } from 'redux'
import { logout } from '../store/actions/user'
import { sendList } from '../store/actions/animes'

class MyNav extends Component {
  render() {
    let { user } = this.props
    return (
      <React.Fragment>
        <nav className="navbar my-nav sticky-top navbar-light pb-0">
            <span>
                <img src={logo} className="App-logo mb-3" alt="logo" />
                  <h1 onClick={() => this.props.sendList(1)} className="navbar-brand"> <Link style={{ color: '#34495E'}} to="/"> Madnime</Link></h1>
            </span>
            <div className="col">
            <Search />
            </div>
            <span className="row">
                <div className="col"> 
                  <h6 className=" my-nav-btn dropdown-toggle" data-toggle="dropdown"> <i className="fas fa-user"></i></h6>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to="/profile"> Profile </Link>
                    {
                      !user &&
                      <>
                        <Link className="dropdown-item" to="/register"> Register </Link>
                        <Link className="dropdown-item" to="/login"> Login </Link>
                      </>
                    }
                    {
                      user &&
                      <h6 className="dropdown-item" onClick={this.props.logout}>Sign out</h6>
                    }
                  </div>
                </div>
            </span>

        </nav>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ logout, sendList }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyNav)