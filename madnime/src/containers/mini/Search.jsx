import React, { Component } from 'react'
//Store
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { search } from '../../store/actions/animes'

class Search extends Component {
    state = {
        query: ''
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    } 

    search = (e) => {
        e.preventDefault()

        this.props.search(this.state.query)
        this.setState({
            query: ''
        })
    }

    render() {
        return (
        <form onSubmit={this.search}>
            <div className="input-group mr-1">
                <input type="text" value={this.state.query} name="query" onChange={this.handleChange.bind(this)} className="form-control" placeholder="search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button type="submit" onClick={this.search} className="input-group-text" id="basic-addon2"><i className="fas fa-search"></i></button>
                </div>
            </div>
        </form>
        )
    }
}


  const mapDispatchToProps = (dispatch) => bindActionCreators({ search }, dispatch)
  
  
  export default connect(null, mapDispatchToProps)(Search)