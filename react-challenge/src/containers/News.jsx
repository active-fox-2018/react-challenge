import React, { Component } from 'react'
import NewsCard from './news/NewsCard.jsx'
import NewsCategory from './news/NewsCategory.jsx'
import NewsSearch from './news/NewsSearch.jsx'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { updateNewsData } from '../store/actions/news.js'
import { updateFavoritesData } from '../store/actions/favorites.js'
// import {bindActionCreators} from 'redux'

class News extends Component {
    state = {
        categories: 'business entertainment general health science sports technology'.split(' '),
    }

    componentDidMount() {
        this.getNews()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.category !== this.props.match.params.category) {
            this.getNews()
        }
        if (prevProps.match.params.search !== this.props.match.params.search) {
            this.getNews()
        }
    }

    async getNews() {
        const category = this.props.match.params.category || ''
        const search = this.props.match.params.search || ''
        await this.props.updateFavoritesData()
        await this.props.updateNewsData(category, search)
    }

    render() {
        const { categories } = this.state
        const { newsData, favoritesData } = this.props
        const search = this.props.match.params.search || ''
        const selectedCategory = this.props.match.params.category || ''

        if (newsData.status === 'loading') {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    Loading...
                </div>
            )
        } else if (newsData.articles.length === 0) {
            return (
                <div className="d-flex justify-content-center">
                    No news found | 
                    <Link to="/">Go back</Link>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <Link to="/" className="col btn btn-light">All news</Link>
                    <Link to="/favorites" className="col btn btn-light">Favorites</Link>
                    <Link to="/logout" className="col btn btn-light">Logout</Link>
                </div>
                <div className="row">
                    <Link to="/" className="col btn btn-light">⌂</Link>
                    {categories.map((category, i) => <NewsCategory key={i} selectedCategory={selectedCategory} category={category}></NewsCategory>)}
                    <NewsSearch search={search}></NewsSearch>
                </div>
                {newsData.articles.map((article, i) => <NewsCard key={i} article={article} favoritesData={favoritesData}></NewsCard>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    newsData: state.news.newsData,
    favoritesData: state.favorites.favoritesData,
})

const mapDispatchToProps = (dispatch) => ({
    updateNewsData: (category, search) => dispatch(updateNewsData(category, search)),
    updateFavoritesData: (category, search) => dispatch(updateFavoritesData(category, search)),
})
// const mapDispatchToProps = (dispatch) => bindActionCreators({updateNewsData,updateFavoriteData}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(News)
