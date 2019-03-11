import React from 'react'
import {
  Redirect, Route
} from "react-router-dom";
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log(Component);
  return (
    <Route
      {...rest}
      render={props =>
        rest.isLogin ? (<Component {...props} />) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)}
    />
  )
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin
})

export default connect(mapStateToProps)(PrivateRoute)
