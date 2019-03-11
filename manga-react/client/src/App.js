import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './helpers/PrivateRoute'
import Navbar from './container/manga/Navbar'
import Home from './container/Home'
import Login from './container/Login'
import { connect } from 'react-redux'
import { checkLogin } from './store/actions/kitsuActions'
import { BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

//components
import Manga from './container/Manga'
import DetailManga from './container/manga/DetailManga'

export const history = createBrowserHistory()

class App extends Component {
  componentDidMount = ()=> {
    this.props.checkLogin()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          
          <Navbar />

          <Switch>
            <Route exact path='/' component={Home}/>
            <PrivateRoute exact path='/manga-collection' component={Manga}/>
            <Route exact path='/login' component={Login}/>
            <Route path='/details/:id' component={(props) => <DetailManga {...props}/>}/> 
            <Route render={() => <h3>NOT FOUND</h3>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin,
})

const mapDispatchToProps = (dispatch) => ({
  checkLogin: ()=> dispatch(checkLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
