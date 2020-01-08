import React, { Component } from 'react';
import socket from '../../socket';

// import components
import Chatbox from './Chatbox';
import Suggestions from './Suggestions';
import Robot from './Robot';

export default class index extends Component {
  constructor() {
    super();

    this.state = {
      client: socket(),
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
            <Robot client={this.state.client}></Robot>

            <Chatbox
              suggested={this.state.suggested}
              client={this.state.client}
            ></Chatbox>
          </div>

          <Suggestions onSuggestionClick={this.handleSuggestion}></Suggestions>
        </div>
      </>
    );
  }
}
