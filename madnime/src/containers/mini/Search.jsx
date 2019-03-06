import React, { Component } from 'react'

export default class Search extends Component {
    state = {
        query: ''
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    } 


    render() {
        return (
        <React.Fragment>
            <input type="text" value={this.state.query} name="newTodo" onChange={this.handleChange.bind(this)}></input>
            <button onClick={this.addNewTodo}> hehehe </button>
        </React.Fragment>
        )
    }
}
