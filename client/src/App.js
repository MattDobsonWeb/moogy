import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/main.scss';

// import components
import Header from './components/layout/Header';
import Home from './components/home';
import Data from './components/data';
import Train from './components/train';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/data" component={Data}></Route>
            <Route path="/train" component={Train}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
