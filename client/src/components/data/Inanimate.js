import React, { Component } from 'react';
import axios from 'axios';

// import components
import Replies from './Replies';

export default class Inanimate extends Component {
  constructor() {
    super();

    this.state = {
      inanimate: [],
      count: 8,
      totalCount: 0
    };

    this.onViewMore = this.onViewMore.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/data/opinions/inanimate?count=${this.state.count}`)
      .then(res => {
        this.setState({
          totalCount: res.data.totalCount,
          inanimate: res.data.data
        });
      });
  }

  onViewMore(e) {
    e.preventDefault();

    const { count } = this.state;

    axios.get(`/api/data/opinions/inanimate?count=${count + 8}`).then(res => {
      this.setState({
        totalCount: res.data.count,
        inanimate: res.data.data,
        count: this.state.count + 2
      });
    });
  }

  render() {
    const { inanimate } = this.state;

    return (
      <div className="data-section">
        <h2>
          Opinions - Inanimate{' '}
          <span className="pill light">
            Data Points: {this.state.totalCount}
          </span>
        </h2>

        <div className="data-grid">
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

                <Replies replies={inanimate.replies}></Replies>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
