import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/main.scss';

// import components
import Header from './components/layout/Header';
import Home from './components/home';
import Data from './components/data';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/data" component={Data}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
