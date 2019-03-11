import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (<Route
        {...rest}
        render={props =>
            localStorage.token ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
    )
};

const mapStateToProps = (state) => ({
    isLogin: state.login.isLogin
})

export default connect(mapStateToProps)(PrivateRoute)