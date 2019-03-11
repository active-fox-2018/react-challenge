import axios from 'axios'
const url = 'https://api.jikan.moe/v3'

export function getTopAnimes() {
  return dispatch => {
    dispatch({type: 'GET_TOP_ANIMES_LOADING'})
    axios
      .get(`${url}/top/anime/1`)
      .then(({data}) => {
        dispatch({type: 'GET_TOP_ANIMES_SUCCESS', payload: {animes: data.top}})
      })
      .catch(err => {
        dispatch({type: 'GET_TOP_ANIMES_ERR'})
      })
  }
}

export function getAnimeDetail(id) {
  return dispatch => {
    dispatch({type: 'GET_ANIME_DETAIL_LOADING'})
    axios
      .get(`${url}/anime/${id}`)
      .then(({data}) => {
        dispatch({type: 'GET_ANIME_DETAIL_SUCCESS', payload: {anime: data}})
      })
      .catch(err => {
        dispatch({type: `GET_ANIME_DETAIL_ERR`})
      })
  }
}

export function searchAnime(query) {
  return dispatch => {
    dispatch({type: 'SEARCH_LOADING'})
    axios
      .get(`https://cors-anywhere.herokuapp.com/${url}/search/anime/?q=${query}&limit=50`)
      .then(({data}) => {
        console.log(data.results);

        dispatch({type: 'SEARCH_SUCCESS', payload: {animes: data.results}})
      })
      .catch(err => {
        dispatch({type: `SEARCH_ERR`})
      })
  }
}