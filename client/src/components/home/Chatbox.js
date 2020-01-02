import React, { Component } from 'react';
import socket from '../../socket';

class Chatbox extends Component {
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

    let message = {
      sent: this.state.message,
      reply: ''
    };

    this.setState({
      chatHistory: [...this.state.chatHistory, message],
      message: ''
    });
  }

  onMessageReceived(entry) {
    console.log('onMessageReceived:', entry);
    this.setState({
      chatHistory: this.state.chatHistory.concat(entry.message)
    });
  }

  onReplyReceived(entry) {
    console.log('reply', entry);
    const chat = this.state.chatHistory;

    chat[chat.length - 1].reply = entry;

    this.setState({
      chatHistory: chat
    });
  }

  render() {
    console.log(this.state.chatHistory);
    return (
      <div className="chatbox">
        <div className="messages">
          {this.state.chatHistory.map(message => (
            <div className="single-message">
              <p>{message.sent}</p>
              <p>{message.reply ? message.reply : '...'}</p>
            </div>
          ))}
        </div>

        <div className="text-box-wrapper">
          <form>
            <input
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.onChange}
            />
            <button className="btn-main" onClick={this.onSendMessage}>
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chatbox;
