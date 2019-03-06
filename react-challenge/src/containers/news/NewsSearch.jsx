import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class NewsSearch extends Component {
    state = {
        search: '',
        redirect: false,
    }

    componentDidMount() {
        this.setState({
            redirect: false,
            search: this.props.search
        })
    }

    searchNews = (e) => {
        e.preventDefault()
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.redirect) {
            this.setState({ redirect: false })
            return (<Redirect to={`/search/${this.state.search}`}></Redirect>)
        }

        return (
            <div className="form-col">
                <form className="form-inline" onSubmit={this.searchNews}>
                    <input className="form-control" type="text" name="search"
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        placeholder="Search" />
                    <input className="btn btn-light" type="submit" value="🔍" />
                </form>
            </div>
        )
    }
}
