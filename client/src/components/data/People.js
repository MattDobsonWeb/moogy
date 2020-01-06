import React, { Component } from 'react';
import axios from 'axios';

export default class People extends Component {
  constructor() {
    super();

    this.state = {
      opinions: []
    };
  }

  componentDidMount() {
    axios.get('/api/data/opinions/people').then(res => {
      console.log(res);
      this.setState({ opinions: res.data });
    });
  }

  render() {
    const { opinions } = this.state;

    return (
      <div className="data-section">
        <h2>Opinions - People</h2>
        {opinions.length > 0 &&
          opinions.map((opinion, index) => (
            <div className="data-point" key={index}>
              <h3>
                {opinion.names.map((name, index) => {
                  if (index !== opinion.names.length - 1) {
                    return <span key={index}>{name}, </span>;
                  } else {
                    return <span key={index}>{name}</span>;
                  }
                })}
              </h3>

              <div className="replies">
                <ul>
                  {opinion.replies.map((reply, index) => (
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
                </ul>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
