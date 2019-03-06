import React, { Component } from 'react'
import NewsCard from './news/NewsCard.jsx'
import NewsCategory from './news/NewsCategory.jsx'
import NewsSearch from './news/NewsSearch.jsx'
import * as favorites from '../api/favorites.js'
import { getNews } from '../api/news.js'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { updateNewsData } from '../store/actions/news.js'
// import {bindActionCreators} from 'redux'

class News extends Component {
    state = {
        categories: 'business entertainment general health science sports technology'.split(' '),
    }

    componentDidMount() {
        this.getNews()
        this.getFavorites()
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
        this.props.updateNewsData([{ title: 'Loading...', source: {}, publishedAt: new Date().toISOString() }])
        const category = this.props.match.params.category || ''
        const search = this.props.match.params.search || ''

        let newsData = await getNews(category, search)
        this.props.updateNewsData(newsData.data.articles)
        console.log(this.props.newsData)
    }

    async getFavorites() {
        this.props.updateFavoritesData([{ title: 'Loading...', source: {}, publishedAt: new Date().toISOString() }])
        let favoritesData = await favorites.get()
        this.props.updateFavoritesData(favoritesData.articles)
        console.log(this.props.favoritesData)
    }

    render() {
        const { categories } = this.state
        const { newsData } = this.props
        const search = this.props.match.params.search || ''
        const selectedCategory = this.props.match.params.category || ''

        return (
            <div className="container">
                <div className="row">
                    <Link to="/" className="col btn btn-light">⌂</Link>
                    {categories.map((category, i) => <NewsCategory key={i} selectedCategory={selectedCategory} category={category}></NewsCategory>)}
                    <NewsSearch search={search}></NewsSearch>
                </div>
                {newsData.map((article, i) => <NewsCard key={i} article={article}></NewsCard>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    newsData: state.newsData,
    favoritesData: state.favoritesData,
})

const mapDispatchToProps = (dispatch) => ({
    updateNewsData: (newsData) => dispatch(updateNewsData(newsData)),
    updateFavoritesData: (favoritesData) => dispatch(updateFavoritesData(favoritesData)),
})
// const mapDispatchToProps = (dispatch) => bindActionCreators({updateNewsData,updateFavoritesData}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(News)
