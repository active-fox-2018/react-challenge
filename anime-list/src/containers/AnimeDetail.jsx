import React, { Component } from 'react'
import img from "../assets/loading.gif"
import { connect } from "react-redux"
import { getAnimeDetail } from '../store/actions/apiAction';
import { addToFavorites } from '../store/actions/userAction';

class AnimeDetail extends Component {
  componentDidMount() {
    this.props.getAnimeDetail(this.props.match.params.id)
  }

  addToFavorites = () => {
    if (this.props.uid) {
      if (this.props.favorites.filter(e => e.uid === this.props.uid && e.anime.mal_id === this.props.anime.mal_id).length > 0) {
        console.log('sudah pernah ya');
      } else {
        let obj = {
          anime: this.props.anime,
          uid: this.props.uid
        }
        this.props.addToFavorites(obj)
      }
    } else {
      console.log('login dulu bro');
    }
  }

  render() {
    const { anime, loadingApi, loadingUser } = this.props

    return (
      <div className="container mt-2">
        {loadingApi && <img src={img} />}
        {loadingUser && <img src={img} />}
        {!loadingApi &&
          <div className="row no-gutters">
            <div className="col-md-3">
              <img src={anime.image_url} className="card-img" alt="..." />
              <button type="button" className="btn btn-info mt-3" onClick={this.addToFavorites}>+ add to favorites</button>
            </div>
            <div className="col-md-9">
              <div className="container">
                <div className="card mb-4">
                  <div className="row no-gutters">
                    <div className="col-md-2">
                      <span><b>Score</b></span><br />
                      <span><b>{anime.score}</b></span><br />
                      <span>{Number(anime.scored_by).toLocaleString()} users</span>
                    </div>
                    <div className="col-md-10">
                      <div className="row">
                        <div className="col-sm-4">Ranked # <b>{anime.rank}</b> </div>
                        <div className="col-sm-4">Popularity # <b>{anime.popularity}</b> </div>
                        <div className="col-sm-4">Members <b>{Number(anime.members).toLocaleString()}</b> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-left"><b>Synopsis</b></p>
                <hr />
                <p>{anime.synopsis}</p>
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
  uid: state.user.uid,
  favorites: state.user.favorites,
  anime: state.api.anime,
  loadingApi: state.api.loading,
  loadingUser: state.user.loading,
  err: state.api.err
})

const mapDispatchToProps = (dispatch) => ({
  getAnimeDetail: (id) => dispatch(getAnimeDetail(id)),
  addToFavorites: (data) => dispatch(addToFavorites(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnimeDetail)
