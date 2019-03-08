import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchMovieDetails } from '../store/actions/fetchApi'
import Jumbotron from '../components/Jumbotron'
import { addFavorite, createFavorite, getFavorites } from '../store/actions/favorites'
import alertify from 'alertifyjs'

class Detail extends Component {
  componentDidMount() {
    this.props.getFavorites()
    this.props.getMovieDetails(this.props.match.params.id)
  }

  addToFavorite = () => {
    if (this.props.favorites.length === 0) {
      this.props.createFav(this.props.movieDetails.movieDetails)
      alertify.success('Movie Added to Favorites');

    } else {
      let isAdded = false
      this.props.favorites.forEach(fav => {
        if (Number(fav.id) === Number(this.props.match.params.id)) {
          isAdded = true
        }
      })

      if (!isAdded) {
        let merge = {docId: this.props.favorites[this.props.favorites.length-1].docId, ...this.props.movieDetails.movieDetails}
        this.props.addToFavorite(merge)
        alertify.success('Movie Added to Favorites');
      } else {
        alertify.error('You Have Added this Movie to Favorites');
      }
    }
  }
  render() { 
    if (!this.props.loading) {
      return ( 
        <div className="row">
          <div className="col-4">
            <img className="img-fluid" src={`https://image.tmdb.org/t/p/original${this.props.movieDetails.movieDetails.poster_path}`}  alt={this.props.movieDetails.movieDetails.original_title}></img>
          </div>
          <div className="col-8">
            <Jumbotron details={this.props.movieDetails.movieDetails} addToFavorite={this.addToFavorite}></Jumbotron>
          </div>
        </div>
      );
    }
    return (
      <>
        <img src="https://i2.wp.com/media.boingboing.net/wp-content/uploads/2015/10/tumblr_nlohpxGdBi1tlivlxo1_12801.gif?zoom=1&w=500" alt="Waiting..."/>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  movieDetails: state.fetchApi,
  loading: state.fetchApi.loading,
  error: state.fetchApi.error,
  favorites: state.favorites.favorites
})

const dispatchToProps = (dispatch) => ({
  getMovieDetails: (id) => dispatch(fetchMovieDetails(id)),
  addToFavorite: (movie) => dispatch(addFavorite(movie)),
  createFav: (movie) => dispatch(createFavorite(movie)),
  getFavorites: () => dispatch(getFavorites())

})
 
export default connect(mapStateToProps, dispatchToProps)(Detail)