import React, { Component } from 'react'
import { connect } from 'react-redux'

//actions
import { FetchAllFilms, GetWatchList } from '../../store/actions/FilmsApiActions'

//components
import SingleFilm from './SingleFilm'

class FilmList extends Component {

  componentDidMount() {
    this.props.FetchAllFilms()
    this.props.GetWatchList()
  }

  render() {
    const { allFilms, isLoading, hasErrored, watchList } = this.props

    if (hasErrored) {
      return (
        <>
          <p>Sorry! There was an error loading the this page. Please try again later! </p>
        </>
      )
    }

    if (isLoading) {
      return (
        <div className="text-center">
          <img src={'https://www.demilked.com/magazine/wp-content/uploads/2016/07/studio-ghibli-totoro-gifs-exercise-motivation-cl-terry-4.gif'} alt="..."></img>
        </div>
      )
    }

    return (
      <div className="container">
        {window.location.pathname === '/watchlist' ?
          (<h5 className="my-2 text-left">Your WatchList</h5>):
          (<h5 className="my-2 text-left">Studio Ghibli Film Database</h5>)
        }
        <div className="row">
          {window.location.pathname !== '/watchlist' ? allFilms.map(film => <SingleFilm key={film.id} film={film} watchList={watchList} />) : watchList.map(film => <SingleFilm key={film.id} film={film} watchList={watchList} />)}
        </div>

      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => ({
  FetchAllFilms: () => dispatch(FetchAllFilms()),
  GetWatchList: () => dispatch(GetWatchList())
})

const mapStateToProps = (state) => ({
  allFilms: state.FilmsApi.allFilms,
  watchList: state.FilmsApi.watchList,
  isLoading: state.FilmsApi.isLoading,
  hasErrored: state.FilmsApi.hasErrored
})

export default connect(mapStateToProps, mapDispatchToProps)(FilmList)