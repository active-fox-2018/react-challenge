import React, { Component } from 'react'
import FavoritesCard from './favorites/FavoritesCard.jsx'

import { connect } from 'react-redux'
import { updateFavoritesData } from '../store/actions/favorites.js'

class Favorites extends Component {
    componentDidMount() {
        this.getFavorites()
    }

    getFavorites = () => {
        this.props.updateFavoritesData()
    }

    render() {
        const { favoritesData } = this.props

        if (favoritesData.length === 0) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col btn btn-light">
                        Your favorites
                    </div>
                </div>
                {favoritesData.map((favorite, i) => (<FavoritesCard key={i} favorite={favorite}></FavoritesCard>))}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    favoritesData: state.favorites.favoritesData
})

const mapDispatchToProps = (dispatch) => ({
    updateFavoritesData: () => dispatch(updateFavoritesData())
})

// const mapDispatchToProps = (dispatch) => bindActionCreators({updateFavoritesData}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
