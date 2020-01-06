import React, { Component } from 'react';
import axios from 'axios';

export default class Inanimate extends Component {
  constructor() {
    super();

    this.state = {
      inanimate: []
    };
  }

  componentDidMount() {
    axios.get('/api/data/opinions/inanimate').then(res => {
      this.setState({ inanimate: res.data });
    });
  }

  render() {
    const { inanimate } = this.state;

    return (
      <div className="data-section">
        <h2>Opinions - Inanimate</h2>
        {inanimate.length > 0 &&
          inanimate.map((inanimate, index) => (
            <div className="data-point" key={index}>
              <h3>
                {inanimate.values.map((value, index) => {
                  if (index !== inanimate.values.length - 1) {
                    return <span key={index}>{value}, </span>;
                  } else {
                    return <span key={index}>{value}</span>;
                  }
                })}
              </h3>

              <div className="replies">
                <ul>
                  {inanimate.replies.map((reply, index) => (
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
