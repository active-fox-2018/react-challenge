import React, { Component } from 'react'
import Anime from './animes/Anime'

import styled from 'styled-components'
import {
  Link
} from 'react-router-dom'

//Store
import { connect } from 'react-redux'
const All = styled.div`
  text-align: center;
  column-count: 4 !important;
`
class Profile extends Component {
  render() {
    let list = this.props.fav
    return (
      <div className="col">
      <h1 className="fav-title">My Favorite</h1>
          <div className="row">
            <All className="mx-5 mt-2 card-columns">
              { list[0] && list[0] !== 'no' && 
                list.map(anime => <Link key={anime.anime.mal_id} to={`/anime/${anime.anime.mal_id}`}> <Anime anime={anime.anime}> </Anime> </Link>) 
              }
            </All>
          </div>
         {
          !list[0] &&
          <img style={{ width: '40vw', height: '65vh'}} className="container mx-auto" src="https://newvitruvian.com/images/spinner-svg-cartoon-4.gif" alt="loading"/>
        }
        {
          list[0] === 'no' &&
          <img style={{ width: '40vw', height: '65vh'}} className="container mx-auto" src="https://thumbs.gfycat.com/SpanishFavorableCowrie-max-1mb.gif" alt="empty"/>
        }

      </ div>
    )
  }
}


const mapStateToProps = (state) => ({
  fav: state.user.fav
})

// const mapDispatchToProps = (dispatch) => ({
//   sendList: (e) => dispatch(sendList(e)) 
// })



export default connect(mapStateToProps)(Profile)