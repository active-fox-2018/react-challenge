import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToFavorites, removeFromFavorites } from '../../store/actions/userAction';

class SingleAnime extends Component {
  state = {
    favorite: false,
    _id: null
  }

  componentDidMount = () => {
    let ids = this.props.favorites.map(e => e.anime.mal_id)
    if (ids.includes(this.props.anime.mal_id)) {
      this.setState({
        favorite: true
      })
    }
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

  checkFav = () => {
    let result = this.props.favorites.filter(e => e.anime.mal_id === this.props.anime.mal_id)
    if (result[0]) {
      this.setState({
        favorite: true,
        _id: result[0]._id
      })
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

  render() {
    const { anime, index } = this.props

    return (
      <div className="card text-left mb-2">
        <div className="row no-gutters h-100">
          <div className="col-md-1 align-self-center">
            <h4 className="text-center" >{index}</h4>
          </div>
          <div className="col-md-1">
            <img src={anime.image_url} className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title"><Link to={`/anime/${anime.mal_id}`}>{anime.title}</Link></h5>
              <span className="card-text"><small className="text-muted">{anime.type} ({anime.episodes} eps)</small></span><br />
              <span className="card-text"><small className="text-muted">{anime.members.toLocaleString()} members</small></span><br />
            </div>
          </div>
          <div className="col-md-2 text-center align-self-center">
            {this.state.favorite && <button type="button" className="btn btn-danger btn-sm" onClick={this.removeFromFavorites}>remove from favorites</button>}
            {!this.state.favorite && <button type="button" className="btn btn-info btn-sm" onClick={this.addToFavorites}>+ add to favorites</button>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  uid: state.user.uid,
  favorites: state.user.favorites,
  isLogin: state.user.isLogin
})

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (data) => dispatch(addToFavorites(data)),
  removeFromFavorites: (id) => dispatch(removeFromFavorites(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAnime)
