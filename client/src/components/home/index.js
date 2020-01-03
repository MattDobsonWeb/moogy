import React, { Component } from 'react';

// import components
import Chatbox from './Chatbox';
import Suggestions from './Suggestions';
import Robot from './Robot';

export default class index extends Component {
  constructor() {
    super();

    this.state = {
      suggested: ''
    };

    this.handleSuggestion = this.handleSuggestion.bind(this);
  }

  handleSuggestion(suggested) {
    this.setState({ suggested: suggested });
  }

  render() {
    return (
      <>
        <div className="main-content">
          <div className="center-content">
            <Chatbox suggested={this.state.suggested}></Chatbox>

            <Robot></Robot>
          </div>

          <Suggestions onSuggestionClick={this.handleSuggestion}></Suggestions>
        </div>
      </>
    );
  }
}
