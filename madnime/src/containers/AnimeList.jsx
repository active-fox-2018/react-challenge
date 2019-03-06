import React, { Component } from 'react'
import Anime from './animes/Anime'
import styled from 'styled-components'
import jikan from '../api/jikan'
import {
  Link
} from 'react-router-dom'

const All = styled.div`
  text-align: center;
  column-count: 4 !important;
`
export default class AnimeList extends Component {
  state = {
      list: []
  }

  fetchAnime = () => {
      jikan({
          method: 'get',
          url: '/top/anime'
      })
      .then( data => {
        this.setState({
            list: data.data.top
        })
      })
  }

  componentDidMount () {
      this.fetchAnime()
  }

  render() { 
    return (
      <React.Fragment>
        <All className="mx-5 mt-4 card-columns">
          { this.state.list && 
            this.state.list.map(anime => <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}> <Anime anime={anime}> </Anime> </Link>) 
          }
        </All>
         {
            !this.state.list[0] &&
            <img style={{ width: '40vw', height: '65vh'}} className="container mx-auto" src="https://newvitruvian.com/images/spinner-svg-cartoon-4.gif" alt="loading"/>
          }

      </React.Fragment>
    )
  }


}