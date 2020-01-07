import React, { Component } from 'react';
import axios from 'axios';

export default class MessageCard extends Component {
  constructor() {
    super();

    this.state = {
      sentiment: null,
      sucess: false,
      error: ''
    };

    this.onSentimentSelect = this.onSentimentSelect.bind(this);
    this.onConfirmSentiment = this.onConfirmSentiment.bind(this);
  }

  onSentimentSelect(e, sentiment) {
    e.preventDefault();

    this.setState({ sentiment: sentiment });
  }

  onConfirmSentiment(e) {
    e.preventDefault();
    const { type, message } = this.props;

    let data = {};
    if (type === 'person') {
      data = {
        names: message.names,
        message: message.message,
        sentiment: this.state.sentiment
      };
    } else {
      data = {
        values: message.values,
        message: message.message,
        sentiment: this.state.sentiment
      };
    }

    axios
      .post(`/api/data/train/${type}`, data)
      .then(res => {
        if (res.data.success) {
          this.setState({ success: true });
        }
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render() {
    const { message, type } = this.props;
    const { sentiment, success } = this.state;

    if (!success) {
      return (
        <div className="message-card">
          <h3 className="heading">
            {type === 'person' ? 'Name(s)' : 'Value(s)'}
          </h3>
          {type === 'person'
            ? message.names.map((name, index) => {
                if (index !== message.names.length - 1) {
                  return <span key={index}>{name}, </span>;
                } else {
                  return <span key={index}>{name}</span>;
                }
              })
            : message.values.map((value, index) => {
                if (index !== message.values.length - 1) {
                  return <span key={index}>{value}, </span>;
                } else {
                  return <span key={index}>{value}</span>;
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
                  onClick={this.onConfirmSentiment}
                >
                  Train!
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="message-card success">
          <h2>
            Thanks for training the model! Moogy's database has been updated
          </h2>
        </div>
      );
    }
  }
}
