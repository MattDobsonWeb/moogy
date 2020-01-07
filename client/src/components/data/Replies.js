import React, { Component } from 'react';

export default class Replies extends Component {
  constructor() {
    super();

    this.state = {
      size: 2
    };

    this.onShowMore = this.onShowMore.bind(this);
  }

  onShowMore(e) {
    e.preventDefault();

    this.setState({ size: this.state.size + 2 });
  }

  render() {
    const { replies } = this.props;
    const { size } = this.state;

    return (
      <div className="replies">
        <h3 className="heading">
          User Opinions and Sentiment{' '}
          <span className="pill light">{replies.length}</span>
        </h3>

        <ul>
          {replies.slice(0, size).map((reply, index) => (
            <li key={index}>
              {reply.message}{' '}
              <span className={`pill ${reply.sentiment}`}>
                {reply.sentiment === 'positive'
                  ? ':)'
                  : reply.sentiment === 'neutral'
                  ? ':|'
                  : reply.sentiment === 'negative'
                  ? ':('
                  : null}
              </span>
            </li>
          ))}

          {replies.length > size && (
            <li>
              <button className="btn-light" onClick={this.onShowMore}>
                Show More
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
