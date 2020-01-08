import React, { Component } from 'react';
import axios from 'axios';

// import components
import Replies from './Replies';
import Loading from '../common/Loading';

export default class DataGrid extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      count: 8,
      totalCount: 0,
      loading: false,
      initialLoading: true
    };

    this.onViewMore = this.onViewMore.bind(this);
  }

  componentDidMount() {
    const { type } = this.props;
    axios
      .get(`/api/data/opinions/${type}?count=${this.state.count}`)
      .then(res => {
        this.setState({
          totalCount: res.data.totalCount,
          data: res.data.data,
          initialLoading: false
        });
      });
  }

  onViewMore(e) {
    const { count } = this.state;
    const { type } = this.props;

    this.setState({ loading: true });

    e.preventDefault();

    axios.get(`/api/data/opinions/${type}?count=${count + 8}`).then(res => {
      this.setState({
        totalCount: res.data.totalCount,
        data: res.data.data,
        count: this.state.count + 8,
        loading: false
      });
    });
  }

  render() {
    const { data, loading, initialLoading } = this.state;
    const { heading, type, hideSentiment } = this.props;

    return (
      <div className="data-section">
        <h2>
          <span>{heading}</span>{' '}
          {!initialLoading && (
            <span className="pill light">
              Data Points: {this.state.totalCount}
            </span>
          )}
        </h2>

        {initialLoading ? (
          <Loading></Loading>
        ) : (
          <div className="data-grid">
            {data.length > 0 &&
              data.map((opinion, index) => (
                <div className="data-point" key={index}>
                  <h3 className="heading">
                    {type === 'people' ? `Name(s)` : `Value(s)`}
                  </h3>

                  <p>
                    {type === 'people'
                      ? opinion.names.map((name, index) => {
                          if (index !== opinion.names.length - 1) {
                            return <span key={index}>{name}, </span>;
                          } else {
                            return <span key={index}>{name}</span>;
                          }
                        })
                      : opinion.values.map((value, index) => {
                          if (index !== opinion.values.length - 1) {
                            return <span key={index}>{value}, </span>;
                          } else {
                            return <span key={index}>{value}</span>;
                          }
                        })}
                  </p>

                  <Replies
                    replies={opinion.replies}
                    hideSentiment={hideSentiment ? hideSentiment : false}
                  ></Replies>
                </div>
              ))}
          </div>
        )}

        {this.state.totalCount > data.length && (
          <div className="view-more-wrapper">
            <button className="btn-light" onClick={this.onViewMore}>
              {loading ? (
                <i className="fas fa-circle-notch fa-spin"></i>
              ) : (
                `View More`
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
}
