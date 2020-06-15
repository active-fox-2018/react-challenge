import React, { Component } from 'react'
import { firebase, provider } from '../../api/firebase'

//Store
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { gooSign, login } from '../../store/actions/user'
import { getFav } from '../../store/actions/fav'

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  } 

  gooSign = () => {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        this.props.gooSign({
          name: user.displayName,
          email: user.email
        })
        .then((data) => {
          if (data) {
            this.props.getFav()
            this.props.history.push('/')
            // this.props.history.push(`${this.props.location.state.from.pathname}`)
          }
        })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  login = (e) => {
    e.preventDefault()
    // console.log(this.props)
    let { email, password } = this.state 
    let data = {
      email, password
    }

    this.props.login(data)
      .then( data => {
        if (data) {
          this.props.getFav()
          this.props.history.push('/')
          // this.props.history.push(`${this.props.location.state.from.pathname}`)
        }
      })
  }

  render() {
    const { email, password } = this.state
    return (
      <div style={{ paddingBottom: '3rem'}} className="container mt-3 w-50 my-card">
        <legend>Login</legend>
        <form onSubmit={this.login} className="text-left ">
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" name="email" value={ email } onChange={this.handleChange.bind(this)}  aria-describedby="emailHelp" placeholder="Email" />
            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" value={ password } onChange={this.handleChange.bind(this)}  id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-google float-right">Submit</button>
          <button type="button" onClick={this.gooSign} className="btn btn-google mx-3 float-right"> <img style={{ height: '20px', width: '20px'}} src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png" alt="G"/> Google</button>
      </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ gooSign, login, getFav }, dispatch)


export default connect(null, mapDispatchToProps)(LoginForm)