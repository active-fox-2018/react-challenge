import React, { Component } from 'react'
//Store
import { connect } from 'react-redux'
import { sendDetail } from '../store/actions/animes'
import { addFav, delOne } from '../store/actions/fav'
import { bindActionCreators } from 'redux'

class AnimeDetail extends Component {
  componentDidMount () {
    this.props.sendDetail(this.props.match.params.id)
  }

  addFav = () => {
    this.props.addFav({anime: this.props.anime})
  }

  removeFav = (index) => {
    let id = this.props.fav[index]._id
    this.props.delOne(id)
  }
  
  render() {
    let { anime, user, fav } = this.props
    let index
    if (fav[0] && fav[0] !== 'no') {
       index = fav.findIndex(el => String(el.anime.mal_id) === String(anime.mal_id))
    }
    return (
      <>
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
                  {
                    user && (fav.length === 0 || index === -1 || fav[0] === 'no' ) ?
                    <h2><i onClick={this.addFav} style={{color: 'yellow'}} className="far fa-star click-able"></i></h2> :
                    <h2><i onClick={() => this.removeFav(index)} style={{color: 'yellow'}} className="fas fa-star click-able"></i></h2>
                  }
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
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  anime: state.animes.anime,
  fav: state.user.fav,
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ sendDetail, addFav, delOne}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AnimeDetail)