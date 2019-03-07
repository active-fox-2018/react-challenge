import React, { Component } from 'react'
import Anime from './animes/Anime'
import Pagination from './mini/Pagination'

import styled from 'styled-components'
import {
  Link
} from 'react-router-dom'

//Store
import { connect } from 'react-redux'
import { sendList } from '../store/actions/animes'
import { bindActionCreators } from 'redux'

const All = styled.div`
  text-align: center;
  column-count: 4 !important;
`
class AnimeList extends Component {
  componentDidMount () {
      this.page()
  }

  componentDidUpdate (prev) {
    // console.log(prev)
    if (this.props.match.params.id !== prev.match.params.id) {
      this.page()
    }
  }

  page = () => {
    let page = this.props.match.params.id
    if (page !== 0) {
      this.props.sendList(page)
    } 
  }

  render() { 
    let list = this.props.list
    let pg = this.props.match.params.id || 1

    return (
      <div className="col">
      {
        !this.props.query &&
        <div className="row mx-4 mt-3">
          <Pagination pge={pg}/>
        </div>
      }
          <div className="row">
            <All className="mx-5 mt-2 card-columns">
              { list[0] && 
                list.map(anime => <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}> <Anime anime={anime}> </Anime> </Link>) 
              }
            </All>
          </div>
         {
            !list[0] &&
            <img style={{ width: '40vw', height: '65vh'}} className="container mx-auto" src="https://newvitruvian.com/images/spinner-svg-cartoon-4.gif" alt="loading"/>
          }

      </ div>
    )
  }
}


const mapStateToProps = (state) => ({
  list: state.animes.animeList,
  query: state.animes.query
})

// const mapDispatchToProps = (dispatch) => ({
//   sendList: (e) => dispatch(sendList(e)) 
// })

const mapDispatchToProps = (dispatch) => bindActionCreators({sendList}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AnimeList)