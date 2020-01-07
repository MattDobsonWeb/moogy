import React, { Component } from 'react';

export default class MessageCard extends Component {
  constructor() {
    super();

    this.state = {
      sentiment: null
    };

    this.onSentimentSelect = this.onSentimentSelect.bind(this);
  }

  onSentimentSelect(e, sentiment) {
    e.preventDefault();

    this.setState({ sentiment: sentiment });
  }

  render() {
    const { message } = this.props;
    const { sentiment } = this.state;

    return (
      <div className="message-card">
        <h3 className="heading">Name(s)</h3>
        {message.names.map((name, index) => {
          if (index !== message.names.length - 1) {
            return <span key={index}>{name}, </span>;
          } else {
            return <span key={index}>{name}</span>;
          }
        })}

        <div className="message-wrapper">
          <h3 className="heading">Message</h3>
          <div className="message">
            <p>{message.message}</p>

            <div className="sentiment-choice">
              <button
                className={
                  sentiment === 'positive'
                    ? 'sentiment-btn positive selected'
                    : 'sentiment-btn positive'
                }
                onClick={e => this.onSentimentSelect(e, 'positive')}
              >
                :)
              </button>

              <button
                className={
                  sentiment === 'neutral'
                    ? 'sentiment-btn neutral selected'
                    : 'sentiment-btn neutral'
                }
                onClick={e => this.onSentimentSelect(e, 'neutral')}
              >
                :|
              </button>

              <button
                className={
                  sentiment === 'negative'
                    ? 'sentiment-btn negative selected'
                    : 'sentiment-btn negative'
                }
                onClick={e => this.onSentimentSelect(e, 'negative')}
              >
                :(
              </button>

              <button
                className="submit btn-light"
                disabled={!sentiment ? true : false}
              >
                Train!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
