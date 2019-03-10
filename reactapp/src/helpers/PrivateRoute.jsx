import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

function PrivateRoute({component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render = {props => 
        localStorage.token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: props.location
            }
          }}
        />
      )
      }
      />
  )
}

const mapStateToProps = (state) => ({
  loginState: state.loginState.isLogin,
  loadingState: state.loginState.loading
})


export default connect(mapStateToProps)(PrivateRoute)