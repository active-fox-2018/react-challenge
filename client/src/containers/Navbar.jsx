import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//actions
import { logout } from '../store/actions/UsersAction'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }

    this.logout = this.logout.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  logout(event) {
    this.props.logout()
    event.preventDefault()
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let q = new RegExp(this.state.search.toLowerCase());

    var list = this.props.allFilms.filter(function (el) {
      return el.title.toLowerCase().match(q);
    });

    if (list.length) {
      this.props.history.push(`/details/${list[0].id}`)
    } else {
      this.props.history.push('*')
    }

  }


  render() {
    const { isLoggedIn } = this.props

    return (
      <nav style={{ backgroundColor: '#4BA3C3' }} className="navbar navbar-dark text-white shadow rounded-bottom" id="navbar">

        <Link style={{ color: 'white', textDecoration: 'none' }} className="navbar-brand ml-2" to="/"><FontAwesomeIcon icon='home'/> GhibliDB</Link>
        <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
          <input onChange={this.handleChange} name="search" className="form-control mr-sm-2" type="search" placeholder="Jump to..." aria-label="Search" />
          <button className="btn my-2 my-sm-0" type="submit"
            style={{ backgroundColor: 'rgb(13, 61, 94)', color: 'white' }}><FontAwesomeIcon icon="search" /></button>
          <Link to="/watchlist"><button className="btn btn-success mx-sm-2">My Watchlist</button></Link>
          {isLoggedIn ?
            (<button onClick={this.logout} className="btn btn-secondary mx-sm-2">Log Out</button>) :
            (<Link to="/login" style={{ color: 'white', textDecoration: 'none' }}><button className="btn btn-secondary mx-sm-2">Sign In</button></Link>)
          }
        </form>

      </nav>

    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

const mapStateToProps = (state) => ({
  allFilms: state.FilmsApi.allFilms,
  isLoggedIn: state.Users.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))



