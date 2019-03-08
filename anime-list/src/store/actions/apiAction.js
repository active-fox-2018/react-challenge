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