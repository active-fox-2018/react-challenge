import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'


const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
    }
  />

)

const mapStateToProps = (state) => ({
  isLoggedIn: state.Users.isLoggedIn
})

export default connect(mapStateToProps, null)(PrivateRoute)
