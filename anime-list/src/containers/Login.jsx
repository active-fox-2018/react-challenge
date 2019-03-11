import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { firebase, provider } from '../api/firebase'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

// Actions
import { checkLogin } from '../store/actions/userAction'

class Login extends Component {
  state = {
    redirect: false
  }

  login = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    })
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        this.setRedirect()
        this.props.checkLogin()
        Toast.fire({
          type: 'success',
          title: 'Signed in successfully'
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin
})

const mapDispatchToProps = (dispatch) => ({
  checkLogin: () => dispatch(checkLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)