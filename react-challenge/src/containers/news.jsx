import React, { Component } from 'react'
import NewsCard from './news/NewsCard.jsx'
import NewsCategory from './news/NewsCategory.jsx'
import NewsSearch from './news/NewsSearch.jsx'
import { Link } from 'react-router-dom'

export default class news extends Component {
    state = {
        newsData: [{ title: 'Loading...', source: {}, publishedAt: new Date().toISOString() }],
        categories: 'business entertainment general health science sports technology'.split(' '),
        path: ''
    }

    componentDidMount() {
        this.getTopHeadlineNews()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.category !== this.props.match.params.category) {
            this.getTopHeadlineNews()
        }
        if (prevProps.match.params.search !== this.props.match.params.search) {
            this.getTopHeadlineNews()
        }
    }

    async getTopHeadlineNews() {
        this.setState({
            newsData: [{ title: 'Loading...', source: {}, publishedAt: new Date().toISOString() }],
        })
        let url = ''
        const category = this.props.match.params.category || ''
        const search = this.props.match.params.search || ''

        if (search !== '') {
            url = `https://newsapi.org/v2/everything?q=${search}&language=en`
        } else {
            url = `https://newsapi.org/v2/top-headlines?q=&category=${category}&country=us`
        }
        let newsData = await window.axios({
            url,
            headers: {
                'Authorization': 'Bearer 2ee86e45c1cb43b5b559d8042d629fca'
            }
        })
        this.setState({
            newsData: newsData.data.articles
        })
        console.log(this.state.newsData)
    }

    render() {
        const { newsData, categories } = this.state
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
