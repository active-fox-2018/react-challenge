import React, { Component } from 'react'
import { Link } from'react-router-dom'

export default class NotFound extends Component {
  render() {
    return (
      <div className="text-center">
        <h1>No Results Found</h1>
        <Link to="/">Back To Home</Link>
      </div>
    )
  }
}
