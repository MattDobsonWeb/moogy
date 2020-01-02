import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/main.scss';

// import components
import Header from './components/layout/Header';
import Home from './components/home';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
