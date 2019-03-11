import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

//actions
import { register } from '../store/actions/UsersAction'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
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

    event.preventDefault()
    this.props.register(objUser)
  }

  render() {
    const { isLoggedIn, errors } = this.props

    if (isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-12 p-0 flex-col">
            <h1 className="font-weight-light mb-3 text-center">Create An Account</h1>
            <div className="row">
              <div className="col-md-6 mx-auto">
                Already have an account? <Link to="/login">Sign In </Link>
                <br/><br/>

                <form onSubmit={this.handleSubmit}>

                  <div className="form-group">
                    {errors.email ? (<p style={{ color: 'red' }}>{errors.email.message}</p>) : (<></>)}
                    <label>Email address</label>
                    <input onChange={this.handleChange} type="email" name="email" className="form-control" aria-describedby="emailHelp"
                      placeholder="Enter email" />
                  </div>

                  <div className="form-group">
                    {errors.password ? (<p style={{ color: 'red' }}>{errors.password.message}</p>) : (<></>)}
                    <label>Password</label>
                    <input onChange={this.handleChange} type="password" name="password" className="form-control" aria-describedby="emailHelp"
                      placeholder="Enter password" />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
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
  register: (user) => dispatch(register(user))
})

const mapStateToProps = (state) => ({
  errors: state.Users.errors,
  isLoggedIn: state.Users.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
