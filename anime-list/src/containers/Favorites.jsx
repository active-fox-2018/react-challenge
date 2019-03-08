import React, { Component } from 'react'
import { connect } from 'react-redux'

import SingleAnime from "./AnimeList/SingleAnime";

class Favorites extends Component {
  render() {
    return (
      <div className="container mt-2">
        <h1>MY FAVORITES</h1>
        {this.props.favorites.map((favorite, i) => <SingleAnime key={i} anime={favorite.anime} index={i + 1} _id={favorite._id}/> )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  favorites: state.user.favorites,
  uid: state.user.uid
})

export default connect(mapStateToProps)(Favorites)