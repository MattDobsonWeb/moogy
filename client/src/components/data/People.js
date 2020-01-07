import React, { Component } from 'react';
import axios from 'axios';

// import components
import Replies from './Replies';

export default class People extends Component {
  constructor() {
    super();

    this.state = {
      opinions: [],
      count: 8,
      totalCount: 0
    };

    this.onViewMore = this.onViewMore.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/data/opinions/people?count=${this.state.count}`)
      .then(res => {
        this.setState({
          totalCount: res.data.totalCount,
          opinions: res.data.data
        });
      });
  }

  onViewMore(e) {
    e.preventDefault();

    const { count } = this.state;

    axios.get(`/api/data/opinions/people?count=${count + 8}`).then(res => {
      this.setState({
        totalCount: res.data.count,
        opinions: res.data.data,
        count: this.state.count + 2
      });
    });
  }

  render() {
    const { opinions } = this.state;

    return (
      <div className="data-section">
        <h2>
          Opinions - People{' '}
          <span className="pill light">
            Data Points: {this.state.totalCount}
          </span>
        </h2>

        <div className="data-grid">
          {opinions.length > 0 &&
            opinions.map((opinion, index) => (
              <div className="data-point" key={index}>
                <h3 className="heading">Name(s)</h3>

                <p>
                  {opinion.names.map((name, index) => {
                    if (index !== opinion.names.length - 1) {
                      return <span key={index}>{name}, </span>;
                    } else {
                      return <span key={index}>{name}</span>;
                    }
                  })}
                </p>

                <Replies replies={opinion.replies}></Replies>
              </div>
            ))}
        </div>

        {this.state.totalCount > opinions.length && (
          <div className="view-more-wrapper">
            <button className="btn-light" onClick={this.onViewMore}>
              View More
            </button>
          </div>
        )}
      </div>
    );
  }
}
