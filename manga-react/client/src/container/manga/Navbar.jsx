import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/kitsuActions'
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'

class Navbar extends Component {
  state = {
    redirect: false
  }
  logout = ()=> {
    this.props.logoutFirebase()
    this.setRedirect()

  }

  setRedirect = ()=> {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = ()=> {
    if(this.state.redirect && !this.props.isLogin) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-brand">
            <Link to="/" style={{textDecoration: "none", color: "white"}}>
              <h2>Kitsu React</h2>
            </Link>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            <div className="navbar-nav mr-auto">
                <Link to="/" style={{textDecoration: "none", color: "white"}}>
                  <p className="nav-link">Home</p>
                </Link>
            </div>
              {
                this.props.isLogin !== null &&
                <div>
                  {
                    !this.props.isLogin &&  
                    <div>
                      <Link to="/login">
                        <button className="btn btn-primary my-2 ml-2 my-sm-0">Log In</button>
                      </Link>
                      <Link to="/register">
                        <button className="btn btn-primary my-2 ml-2 my-sm-0">Register</button>
                      </Link>
                    </div>             
                  }
    
                  {
                    this.props.isLogin && <div>
                      <Link to="/manga-collection">
                        <button className="btn btn-warning my-2 ml-2 my-sm-0">Collection</button>
                      </Link>
                      <button onClick={this.logout} className="btn btn-danger my-2 ml-2 my-sm-0">Log Out</button>
                    </div>
                  }      

                </div>
              }
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin
})

const mapDispatchToProps = (dispatch) => ({
  logoutFirebase: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)