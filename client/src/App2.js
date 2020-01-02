import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import socket from './socket';

class App extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      client: socket(),
      chatHistory: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.onReplyReceived = this.onReplyReceived.bind(this);
  }

  componentDidMount() {
    this.state.client.registerHandler(this.onMessageReceived);
    this.state.client.registerReply(this.onReplyReceived);
  }

  onChange(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  onSendMessage(e) {
    e.preventDefault();

    this.state.client.message(this.state.message);
  }

  onMessageReceived(entry) {
    console.log('onMessageReceived:', entry);
    this.setState({
      chatHistory: this.state.chatHistory.concat(entry.message)
    });
  }

  onReplyReceived(entry) {
    console.log('reply', entry);
    this.setState({
      chatHistory: this.state.chatHistory.concat(entry)
    });
  }

  render() {
    return (
      <div>
        <ul className="messages">
          {this.state.chatHistory.map(message => (
            <li>{message}</li>
          ))}
        </ul>

        <input
          type="text"
          name="message"
          value={this.state.message}
          onChange={this.onChange}
        />
        <button onClick={this.onSendMessage}>Submit</button>
      </div>
    );
  }
}

export default App;
