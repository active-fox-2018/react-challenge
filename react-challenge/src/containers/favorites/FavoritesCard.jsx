import React, { Component } from 'react'
import * as favorites from '../../api/favorites.js'

export default class FavoritesCard extends Component {
    state = {
        favoriteStatus: 'unremoved'
    }

    removeFromFavorites = async () => {
        this.setState({favoriteStatus:'removing'})
        await favorites.remove(this.props.favorite.id)
        this.setState({favoriteStatus:'removed'})
    }

    render() {
        const { favorite } = this.props
        const article = favorite.article

        return (
            <div className="row">
                <div className="col-2" style={{ 'backgroundImage': `url('${article.urlToImage}')`, 'backgroundSize': 'auto 100%' }}>
                </div>
                <div className="card col-10 btn-light">
                    <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{article.source.name}</h6>
                        <p className="card-text">{article.description}</p>
                        <h6 className="card-subtitle mb-2 text-muted">{new Date(article.publishedAt).toLocaleString()}</h6>
                        <a href={article.url} className="card-link">{article.url}</a>
                        <br />
                        {this.state.favoriteStatus === 'unremoved' ? <button className="btn btn-info" onClick={() => this.removeFromFavorites()}>Remove from favorites</button> : ''}
                        {this.state.favoriteStatus === 'removed' ? <button className="btn btn-info" disabled>Removed from favorites</button> : ''}
                        {this.state.favoriteStatus === 'removing' ? <button className="btn btn-info spinner-border" disabled>|</button> : ''}
                    </div>
                </div>
            </div>
        )
    }
}
