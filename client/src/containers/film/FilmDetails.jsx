import React, { Component } from 'react'
import { connect } from 'react-redux'
//actions
import { FetchFilmById } from '../../store/actions/FilmsApiActions'

class FilmDetails extends Component {

  componentDidMount() {
    this.props.FetchFilmById(this.props.match.params.id)
  }

  render() {
    const { film, isLoading, hasErrored } = this.props

    if (hasErrored) {
      return (
        <p>Sorry! There was an error loading the this page. Please try again later! </p>
      )
    }

    if (isLoading) {
      return (
        <div className="text-center"> 
          <h1>This may take a few seconds...</h1>
          <img src={'https://www.demilked.com/magazine/wp-content/uploads/2016/07/studio-ghibli-totoro-gifs-exercise-motivation-cl-terry-4.gif'} alt='...'></img>
        </div>
      )
    }

    return (
      <div>
        {
          film &&
          <div className="container">
            <h1 className="mb-4 text-center">{film.title}</h1>
            <div className="row">
              <div className="col-sm-4">
                <img style={{ width: '400px', height: '400px' }} className="img-thumbnail" src={film.poster} alt="..."></img>
              </div>
              <div className="col-sm-4">
                <div className="container">
                  <div className="column align-left justify-content-left">
                    <p>Release Date: {film.release_date}</p>
                    <p>Director: {film.director}</p>
                    <p>Producer: {film.producer}</p>
                    <p>Rotten Tomatoes Score: {film.rt_score}/100</p>
                    <p>Description:{film.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4" >
                <h3>Trailer</h3>
                <iframe width="420" height="345" src={film.trailer} title="trailer">
                </iframe>
              </div>
            </div>
          </div>
        }
      </div >
    )
  }
}

const MapDispatchToProps = (dispatch) => ({
  FetchFilmById: (filmId) => dispatch(FetchFilmById(filmId))
})

const MapStateToProps = (state) => ({
  film: state.FilmsApi.film,
  hasErrored: state.FilmsApi.hasErrored,
  isLoading: state.FilmsApi.isLoading
})

export default connect(MapStateToProps, MapDispatchToProps)(FilmDetails)
