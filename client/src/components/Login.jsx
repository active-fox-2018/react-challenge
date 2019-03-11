import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

//actions
import { login } from '../store/actions/UsersAction'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    var objUser = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.login(objUser)
    event.preventDefault()
  }

  render() {
    const { errors, isLoggedIn } = this.props
    if (isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-12 p-0 flex-col">
            <h1 className="font-weight-light mb-3 text-center">Sign In To Your Account</h1>
            <div className="row">
              <div className="col-md-6 mx-auto">
                Don't have an account? <Link to="/register">Sign Up</Link>
                <br /><br />
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <p style={{ color: 'red' }}>{errors.message}</p>
                    <label>Email address</label>
                    <input onChange={this.handleChange} type="email" name="email" className="form-control" id="emailInput" aria-describedby="emailHelp"
                      placeholder="Enter email" />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input onChange={this.handleChange} type="password" name="password" className="form-control" id="passwordInput" aria-describedby="emailHelp"
                      placeholder="Enter password" />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user))
})

const mapStateToProps = (state) => ({
  errors: state.Users.errors,
  isLoggedIn: state.Users.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)