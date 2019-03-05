import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    state = {
        redirect: false
    }

    login = (e) => {
        localStorage.setItem('token', Math.random().toString())
        e.preventDefault()
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.redirect) {
            console.log(this.props)
            console.log(this.state)
            return (<Redirect to="/" />)
        }

        return (
            <div className="container p-1" style={{'textAlign':'center'}}>
                <form onSubmit={this.login}>
                    <input className="btn btn-primary" type="submit" value="Login" />
                </form>
            </div>
        )
    }
}
