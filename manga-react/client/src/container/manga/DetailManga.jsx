import React, { Component } from 'react'
import axios from 'axios'

export default class DetailManga extends Component {
    state = {
        manga: {},
    }
    async componentDidMount () {
        try {
            let fetch = await axios({
                url: `https://kitsu.io/api/edge/manga?filter[id]=${this.props.match.params.id}`,
                method: 'get'
            })
            this.setState({
                manga: fetch.data.data[0],
            })
        } catch (error) {
            console.log(error)
        }
    }
  render() {
    let { manga } = this.state
    
    return (
      <div>
          {
            manga.attributes && <div>
                <img src={manga.attributes.posterImage.tiny} alt=""/>
                <h1>{manga.attributes.canonicalTitle}</h1>
            </div>
          }
      </div>
    )
  }
}
