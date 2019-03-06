import React, { Component } from 'react'

export default class Anime extends Component {
  render() {
    let anime = this.props.anime
    return (
      <div className="card my-card">
        <div >
        <h5 className="anime-title">{ anime.title }</h5>
          <img style={{ height: '100%'}} src={anime.image_url} alt=""/>
        </div>
      </div>
    )
  }
}
