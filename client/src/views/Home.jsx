import React, { Component } from 'react';
import Card from '../components/Card'
import { connect } from 'react-redux'
import { fetchMovies } from '../store/actions/fetchApi'
import Carousel from '../components/Carousel'
import alertify from 'alertifyjs'
import Pagination from '../components/Pagination'
import { getFavorites } from '../store/actions/favorites'
import { Link } from 'react-router-dom'

class Home extends Component {
  state = {
    favorites: []
  }

  componentDidMount = () => {
    if (this.props.history.action === "REPLACE") {
      alertify.error('Please Sign In First');
    }
    this.props.getMovies(this.props.match.params.page || 1)
    this.props.getFavorites()
  }

  changePage = (value) => {
    let currentPage = Number(this.props.match.params.page) || 1
    let changePage = currentPage + value
    this.props.history.push(`/${ changePage }`)
    this.props.getMovies(changePage)
  }

  storeFav = () => {
    this.setState({favorites: this.props.favorites})

  }

  render() {     
     if (!this.props.loading) {
       let index = 0
      return ( 
        <>
        <Carousel moviesSlide={[this.props.movies[0], this.props.movies[1], this.props.movies[2], this.props.movies[3]]}></Carousel>
        <hr></hr>
        <div className ="row">
          <div className="col-9 scroll">
            <div className="card-columns">
              {this.props.movies.map(movie => 
                <Card key={movie.id} movieDetail={movie}></Card>
              )}
            </div>
            <Pagination page={this.props.match.params.page || 1} changePage={this.changePage} ></Pagination>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Favorites</h5>
                {this.props.isLogin ? (
                  <div className="card-columns">
                    {this.props.favorites && this.props.favorites.length > 0 ? (
                      this.props.favorites.map(fav => 
                        Object.keys(fav)[0] !== 'docId' ? (
                          <Link to={`/details/${fav.id}`}>
                            <img key={fav.id} className="img-thumbnail" src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`} alt={fav.original_title}></img>
                          </Link>
                        ) : (
                          <></>
                        )
                      )
                    ) : (
                      <>Loading...</>
                    )}
                  </div>
                ) : (
                  <p className="card-text">Please Login to Add Movie</p>
                )}
              </div>
            </div>
          </div>
        </div>
        </>
      )
     }
      return (
        <>
          <img src="https://i2.wp.com/media.boingboing.net/wp-content/uploads/2015/10/tumblr_nlohpxGdBi1tlivlxo1_12801.gif?zoom=1&w=500" alt="Waiting..."/>
        </>
      )
  }
}

const mapStateToProps = (state) => ({
  movies: state.fetchApi.movies,
  loading: state.fetchApi.loading,
  error: state.fetchApi.error,
  isLogin: state.user.userLoginSuccess,
  favorites: state.favorites.favorites,
  favLoading: state.favorites.loading
})

const dispatchStateToProps = (dispatch) => ({
  getMovies: (page) => dispatch(fetchMovies(page)),
  getFavorites: () => dispatch(getFavorites())
})

export default connect(mapStateToProps, dispatchStateToProps)(Home)