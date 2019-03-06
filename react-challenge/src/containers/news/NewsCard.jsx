import React from 'react'
import * as favorites from '../../api/favorites.js'

export default function newscard(props) {
    const { article } = props

    const addToFavorites = async () => {
        await favorites.add(article)
    }

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
                    <button className="btn btn-light" onClick={() => addToFavorites()}>Add to favorites</button>
                </div>
            </div>
        </div>
    )
}
