import React, { Component } from 'react'
import jikan from '../api/jikan'

export default class AnimeDetail extends Component {
  state = {
    anime: {}
  }

  fetch () {
    jikan({
      method: 'get',
      url: `/anime/${this.props.match.params.id}`
    })
    .then(data => {
      this.setState({
        anime: data.data
      })
    })
  }

  componentDidMount () {
    this.fetch()
  }
  
  render() {
    let { anime } = this.state
    return (
      <React.Fragment>
         {
            !anime.mal_id &&
            <img style={{ width: '40vw', height: '65vh'}} className="container mx-auto" src="https://newvitruvian.com/images/spinner-svg-cartoon-4.gif" alt="loading"/>
          }
      <div className="mx-5 mt-3">
        { anime.mal_id &&
          <div className="card mb-3">
            <div className="card-body row">

              <div className="col-3 ml-2 border-right">

                <div className="row ">
                  <img style={{ width: '95%', height: '100%'}} src={anime.image_url} alt="anime img"/>
                </div>

                <div className="row justify-content-start mt-3">
                  <div className="text-left">

                    <h6 className="mt-3" style={{ fontWeight: '700', fontFamily: 'Verdana'}} >Alternative titles</h6>
                    <hr className="p-2 m-2"/>
                    <div>
                      <h6>Synonyms:</h6>  
                      <span className="small-font"> { anime.title_synonyms.join(' ,')}</span> 
                    </div>

                    <div className="mt-3">
                      <h6>English: </h6>
                      <span className="small-font"> 
                      { anime.title_english}
                      </span> 
                    </div>

                    <div className="mt-3">
                      <h6>Japanese: </h6>
                      <span className="small-font"> 
                      { anime.title_japanese}
                      </span> 
                    </div>

                  </div>
                </div>

              </div>

              <div className="col">

                <div style={{ borderBottom: '1px solid lightgrey'}} className="row mr-2 ml-2">
                  <a href={anime.url} className="col text-left"> <h3> { anime.title }</h3></a>
                  <div className="col-1">
                    <h2><i className="far fa-star"></i></h2>
                  </div>
                </div>

                <div className="row mr-2 ml-2 mt-3 text-left">
                  <div className=" bg-light row w-100 ml-1">
                    <div className="col-2 mt-2 mb-2 ml-2 justify-content-center border-right">
                      <div className="row mt-2 justify-content-center">
                        <h6 className="score text-white px-3 py-1">Score</h6>
                      </div>

                      <div className="justify-content-center row score-num">
                        <h3 className="score-num">
                          {anime.score}
                        </h3>
                      </div>

                      <div className="justify-content-center row">
                        <small>{ anime.scored_by.toLocaleString() } Users</small>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="row mr-2 ml-2 mt-3 text-left">
                  <h5>Synopsis: </h5>
                  {anime.synopsis}
                </div>

                <div className="row mr-2 ml-2 mt-3 text-left">
                  <h5>Background: </h5>
                  {anime.background}
                </div>

                {
                  anime.trailer_url && 
                  <div className="row  mr-2 ml-2 mt-3 ">
                  <h5>Trailer:</h5>
                    <iframe src={anime.trailer_url} title="anime" width="100%" height="500">
                      Sorry your browser does not support inline frames.
                    </iframe>
                  </div>
                }

              </div>
            </div>
        </div>
        }
        </div>
      </React.Fragment>
    )
  }
}
