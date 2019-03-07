import React, { Component } from 'react'

//Store
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { register } from '../../store/actions/user'
import { getFav } from '../../store/actions/fav'

class RegisForm extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  register = (e) => {
    e.preventDefault()
    let {name, email, password} = this.state
    let data = {
      name,
      email,
      password
    }
    this.props.register(data)
      .then((data) =>{ 
        if (data) {
          this.props.getFav()
          this.props.history.push('/')
        }
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  } 

  render() {
    const { name, email, password } = this.state
    return (
      <div style={{ paddingBottom: '3rem'}} className="container mt-3 w-50 my-card">
        <legend>Register</legend>
        <form onSubmit={this.register} className="text-left ">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={ name } onChange={this.handleChange.bind(this)} className="form-control" aria-describedby="emailHelp" placeholder="Name" />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" name="email" value={ email } onChange={this.handleChange.bind(this)} className="form-control" aria-describedby="emailHelp" placeholder="Email" />
            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={ password } onChange={this.handleChange.bind(this)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-form float-right">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ register, getFav }, dispatch)


export default connect(null, mapDispatchToProps)(RegisForm)