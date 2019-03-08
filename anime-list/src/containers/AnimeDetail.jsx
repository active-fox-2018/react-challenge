import React, { Component } from 'react'
import img from "../assets/loading.gif"
import { connect } from "react-redux"
import { getAnimeDetail } from '../store/actions/apiAction';
import { addToFavorites, removeFromFavorites } from '../store/actions/userAction';

class AnimeDetail extends Component {
  state = {
    favorite: false,
    _id: null
  }

  componentDidMount() {
    this.props.getAnimeDetail(this.props.match.params.id)
    this.checkFav()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.isLogin !== prevProps.isLogin) {
      this.setState({
        favorite: false,
        _id: null
      })
    }
    if (this.props.favorites !== prevProps.favorites) {
      this.checkFav()
    }
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

  removeFromFavorites = () => {
    this.props.removeFromFavorites(this.state._id)
    this.setState({
      favorite: false,
      _id: null
    })
  }

  checkFav = () => {
    let result = this.props.favorites.filter(e => e.anime.mal_id === this.props.anime.mal_id)
    if (result[0]) {
      this.setState({
        favorite: true,
        _id: result[0]._id
      })
    }
  }

  render() {
    const { anime, loadingApi, loadingUser } = this.props

    return (
      <div className="container mt-2">
        {loadingApi && <img src={img} alt="" />}
        {loadingUser && <img src={img} alt="" />}
        {!loadingApi &&
          <div className="row no-gutters">
            <div className="col-md-3">
              <img src={anime.image_url} className="card-img" alt="..." />
              {this.state.favorite && <button type="button" className="btn btn-danger mt-3" onClick={this.removeFromFavorites}>remove from favorites</button>}
              {!this.state.favorite && <button type="button" className="btn btn-info mt-3" onClick={this.addToFavorites}>+ add to favorites</button>}
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
  addToFavorites: (data) => dispatch(addToFavorites(data)),
  removeFromFavorites: (id) => dispatch(removeFromFavorites(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnimeDetail)
