import axios from 'axios'

const baseURL = "http://35.198.198.237"

export function FetchAllFilms() {
  return dispatch => {
    dispatch({ type: 'GET_FILMS_LOADING' })
    var films = []
    axios
      .get('https://ghibliapi.herokuapp.com/films')
      .then(({ data }) => {
        films = data.reverse()

        var promises = []
        data.forEach(film => {
          promises.push(axios.get(`https://api.themoviedb.org/3/search/movie?api_key=54742c232ad56eb16eb9a776e0c431c2&language=id&query=${film.title}`))
        })

        return Promise.all(promises)
      })
      .then(res => {

        res.forEach((film, index) => {
          films[index].poster = 'http://image.tmdb.org/t/p/w500/' + film.data.results[0].poster_path;
        })

        dispatch({ type: 'GET_FILMS_SUCCESS', payload: films })

      })
      .catch(({ response }) => {
        dispatch({ type: 'GET_FILMS_ERROR' })
      })
  }
}

export function FetchFilmById(filmId) {
  return dispatch => {
    dispatch({ type: 'GET_FILM_BY_ID_LOADING' })
    var film

    axios
      .get(`https://ghibliapi.herokuapp.com/films/${filmId}`)
      .then(({ data }) => {
        film = data

        return axios
          .get(`https://api.themoviedb.org/3/search/movie?api_key=54742c232ad56eb16eb9a776e0c431c2&language=id&query=${data.title}`)

      })
      .then(res => {
        film.poster = 'http://image.tmdb.org/t/p/w500/' + res.data.results[0].poster_path;

        return axios
          .get(`${baseURL}/trailer/${film.title}`)

      })
      .then(({ data }) => {
        film.trailer = data.data
        dispatch({ type: 'GET_FILM_BY_ID_SUCCESS', payload: film })
      })
      .catch(() => {
        dispatch({ type: 'GET_FILM_BY_ID_ERROR' })
      })
  }
}

export function AddToWatchList(movie) {
  return dispatch => {
    axios
      .put(`${baseURL}/addToWatchlist`, {movie}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        dispatch({ type: 'ADD_TO_WATCHLIST_SUCCESS', payload: movie })
      })
      .catch(({ response }) => {
        console.error(response)
        dispatch({ type: 'ADD_TO_WATCHLIST_ERROR' })
      })
  }
}

export function RemoveFromWatchList(movie){
  return dispatch => {
    axios
      .put(`${baseURL}/removeFromWatchlist/${movie.id}`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {

        dispatch({ type: 'REMOVE_FROM_WATCHLIST_SUCCESS', payload: data.data.WatchList })
      })
      .catch(({response}) => {
        console.error(response)
      })
  }
}

export function GetWatchList(){
  return dispatch => {
    dispatch({type: 'GET_FILMS_LOADING'})
    axios
      .get(`${baseURL}/user`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        dispatch({type: 'GET_WATCHLIST_SUCCESS', payload: data.data.WatchList})
      })
      .catch(({response}) => {
        console.error(response)
      })
  }
}


