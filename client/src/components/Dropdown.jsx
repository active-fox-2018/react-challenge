import React, { Component } from 'react';
import Icon from './Icon'
import {provider, firebase} from '../api/firestore'
import alertify from 'alertifyjs'

import { connect } from 'react-redux'
import { userLogin, userLoginLoading, userLoginError, userLogout } from '../store/actions/user'

class Dropdown extends Component {
  state = {
    iconAttr: {
      "role": "button",
      "id": "dropdownMenuLink",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.userLoginSucceed()
    }
  }

  manageUser = (e) => {
    e.preventDefault()
    this.props.userLoginLoad()
    let self = this
    if(e.target[0].value === 'Sign In') {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        let token = result.credential.accessToken;
        let user = result.user;
        localStorage.setItem('token', token)
        localStorage.setItem('user', user.email)
        self.props.userLoginSucceed()
        alertify.success('Sign In Succeed');
      }).catch(function(error) {
        self.props.userLoginErr()
        alertify.error('Sign In Failed');
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
      });
    } else {
      firebase.auth().signOut().then(function() {
        self.props.userLogout()
        alertify.success('Sign Out Succeed');
        console.log(this.props)
        this.props.history.push('/')
      }).catch(function(error) {
        console.log(error)
        alertify.error('Sign Out Failed');
      });
    }
  }

  render() {
    return ( 
      <div className="dropdown show">
        <Icon classes="btn fas fa-user-circle fa-lg dropdown-toggle cursor iconUser" attr={this.state.iconAttr}></Icon>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
          <form onSubmit={this.manageUser} className="px-4 py-3">
            {this.props.isLogin ? (
              <input value="Sign Out" type="submit" className="btn btn-outline-dark"></input>
            ) : (
              <input value="Sign In" type="submit" className="btn btn-outline-dark"></input>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.userLoginSuccess
})

const dispatchStateToProps = (dispatch) => ({
  userLoginSucceed: () => dispatch(userLogin()),
  userLoginLoad: () => dispatch(userLoginLoading()),
  userLoginErr: () => dispatch(userLoginError()),
  userLogout: () => dispatch(userLogout())
})

export default connect(mapStateToProps, dispatchStateToProps)(Dropdown)
 
