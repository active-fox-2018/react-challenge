import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

//actions
import { AddToWatchList, RemoveFromWatchList } from '../../store/actions/FilmsApiActions'

class SingleFilm extends Component {
  constructor(props) {
    super(props)
    this.handleWatchList = this.handleWatchList.bind(this)
    this.handleRemoveWatchList = this.handleRemoveWatchList.bind(this)
  }

  handleWatchList() {
    if (localStorage.getItem('token')) {
      this.props.AddToWatchList(this.props.film)
    } else {
      this.props.history.push("/login")
    }
  }

  handleRemoveWatchList() {
    if (localStorage.getItem('token')) {
      this.props.RemoveFromWatchList(this.props.film)
    } else {
      this.props.history.push("/login")
    }
  }

  render() {
    const { film, watchList, isLoggedIn } = this.props

    return (
      <div className="card col-sm-4">
        <img className="card-img-top" src={film.poster} alt="..." />
        <div className="card-body">

          <h5 className="card-title">{film.title}</h5>
          <p className="card-text">{film.description.slice(0, 120)}...</p>
        </div>
        <Link style={{ color: "black", textDecoration: "none" }} to={`/details/${film.id}`}><button type="button" className="btn btn-primary mb-2 btn-block">View Details</button></Link>
        {watchList.map(film => film.title).includes(film.title) && isLoggedIn?
          (<button onClick={this.handleRemoveWatchList} className="btn btn-danger mb-4">Remove From Watchlist</button>) :
          (<button onClick={this.handleWatchList} className="btn btn-info mb-4">Add to Watchlist</button>)
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  AddToWatchList: (film) => dispatch(AddToWatchList(film)),
  RemoveFromWatchList: (film) => dispatch(RemoveFromWatchList(film))
})

const mapStateToProps = (state) => ({
  isLoggedIn: state.Users.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SingleFilm))
