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

    if (chat[chat.length - 1]) {
      chat[chat.length - 1].reply = entry;
    }

    this.setState({
      chatHistory: chat
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.suggested !== this.props.suggested) {
      this.state.client.message(this.props.suggested);

      let message = {
        sent: this.props.suggested,
        reply: ''
      };

      this.setState({
        chatHistory: [...this.state.chatHistory, message],
        message: ''
      });
    }
  }

  render() {
    const { chatHistory } = this.state;

    const latestMessages = chatHistory.slice(-4);

    return (
      <div className="chatbox">
        <div className="messages">
          {chatHistory.length < 1 && (
            <div className="no-messages">
              <p>
                Moogy is an opinionated Robot, all of Moogy's opinions are based
                on interactions with other users, ask him about a topic or a
                person!
              </p>
              <p>
                If you don't know what to ask, select a suggested message from
                the bottom!
              </p>

              <p>
                <strong>
                  Disclaimer: Most of Moogy's responses come from user
                  interaction, therefore, some responses may be inappropriate.
                </strong>
              </p>
            </div>
          )}

          {latestMessages.map((message, index) => {
            return (
              <div
                className={
                  index === latestMessages.length - 1
                    ? `single-convo latest`
                    : `single-convo`
                }
                key={index}
                style={{ opacity: (index + 1) / latestMessages.length }}
              >
                <p className="sent">You: {message.sent}</p>
                {message.reply ? (
                  <p className="reply">Moogy: {message.reply}</p>
                ) : (
                  <p className="reply loading">...</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-box-wrapper">
          <form>
            <input
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.onChange}
              autoComplete="off"
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
