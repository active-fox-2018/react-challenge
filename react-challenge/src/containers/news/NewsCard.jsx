import React, { Component } from 'react'
import * as favorites from '../../api/favorites.js'

export default class newscard extends Component {
    state = {
        favoriteStatus: this.props.favoritesData.map(e => e.article.url).includes(this.props.article.url) ? 'added' : 'unadded'
    }

    addToFavorites = async () => {
        this.setState({ favoriteStatus: 'adding' })
        await favorites.add(this.props.article)
        this.setState({ favoriteStatus: 'added' })
    }

    render() {
        const { article } = this.props

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
                        {this.state.favoriteStatus === 'unadded' ? <button className="btn btn-info" onClick={() => this.addToFavorites()}>Add to favorites</button> : ''}
                        {this.state.favoriteStatus === 'added' ? <button className="btn btn-info" disabled>Added to favorites</button> : ''}
                        {this.state.favoriteStatus === 'adding' ? <button className="btn btn-info spinner-border" disabled>|</button> : ''}
                    </div>
                </div>
            </div>
        )
    }
}
