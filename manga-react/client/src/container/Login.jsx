import React, { Component } from 'react'
import { connect } from 'react-redux'
import { manualLogin, loginFirebase  } from '../store/actions/kitsuActions'

class Login extends Component {
  state = {
      email: '',
      password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  } 

  loginFirebase = () => {
    this.props
        .loginFirebase()
        .then(data => {
            if (data ) {
              this.props.history.push('/')
            }
        })
  }

  loginForm = (e) => {
    e.preventDefault()
    let data = {
      email: this.state.email,
      password: this.state.password
    }
    this.props
        .login(data)
        .then(data => {
          if( data ) {
            this.props.history.push('/')
          }
        })
  }

  render() {
    let {email, password} = this.state
    return (
      <div className="tron">
          <img src="https://wallpaperaccess.com/full/8720.jpg" alt="Snow" />
          <div className="centered d-flex flex-column">
            <form className="d-flex justify-content-center flex-column" onSubmit={this.loginForm}>
                <div className="form-group row">
                  <input type="email" value={email} name="email" onChange={this.handleChange.bind(this)} className="form-control" aria-describedby="emailHelp" placeholder="Enter email" style={{width: "80%", marginLeft: "10%"}} />
                  <small id="emailHelp" className="form-text text-muted" style={{width: "80%", marginLeft: "10%"}}>We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group row">
                  <input type="password" value={password} name="password" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Enter password" style={{width: "80%", marginLeft: "10%"}} />
                </div>
                  <div className="row">
                    <div className="col">
                      <button type="submit" className="btn btn-success">Login</button>
                    </div>
                    <div className="col">
                      <button className="btn btn-warning my-2 my-sm-0 ml-2" onClick={this.loginFirebase}><span> <img src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png" alt="" style={{width: "18px"}} /></span> Google</button>
                    </div>
                </div>
            </form>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  mangas: state.api.manga
})

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(manualLogin(data)),
  loginFirebase: () => dispatch(loginFirebase()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)