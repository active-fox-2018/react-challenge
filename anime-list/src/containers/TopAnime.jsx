import React, { Component } from 'react'
import img from "../assets/loading.gif"

// Components
import SingleAnime from "./AnimeList/SingleAnime";
import { connect } from 'react-redux'

class AnimeList extends Component {
  render() {
    const { animes, loading } = this.props
    return (
      <div className="container mt-2">
        <h3 className="text-left">Anime list</h3>
        {loading && <img src={img} alt="" /> }
        <div>
          {!loading && animes.map((anime, i) => <SingleAnime key={i} anime={anime} index={anime.rank} del={this.delete}/> )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  animes: state.api.animes,
  favorites: state.user.favorites,
  loading: state.api.loading,
  err: state.api.err
})

export default connect(mapStateToProps)(AnimeList)