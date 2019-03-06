import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import { PrivateRoute } from './helpers/PrivateRoute'
import Navbar from './container/manga/Navbar'
import Login from './container/LoginPage'
//components
import Manga from './container/Manga'
import DetailManga from './container/manga/DetailManga'

//store
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <Navbar></Navbar>
          <Switch>
            <Route exact path='/' component={Manga}/>
            <PrivateRoute exact path='/details/:id' component={(props) => <DetailManga {...props}/>}/> 
            <Route exact path='/login' component={Login}/>
            <Route render={() => <h3>NOT FOUND</h3>}/>
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
