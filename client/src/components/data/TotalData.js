import React, { Component } from 'react';
import axios from 'axios';

export default class TotalData extends Component {
  constructor() {
    super();

    this.state = {
      dataCount: 0,
      entryCount: 0,
      sentiment: '',
      loading: true
    };
  }

  componentDidMount() {
    axios.get('/api/data/totals').then(res => {
      this.setState({
        dataCount: res.data.dataCount,
        entryCount: res.data.entryCount,
        sentiment: res.data.sentiment,
        loading: false
      });
    });
  }

  render() {
    const { dataCount, entryCount, sentiment, loading } = this.state;

    let sentimentCapitalised =
      sentiment.charAt(0).toUpperCase() + sentiment.slice(1);

    return (
      <div className="total-data">
        <div className="total-section">
          <h2 className="heading">Total Data Points</h2>
          <p className="value">
            {loading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              dataCount
            )}
          </p>
        </div>

        <div className="total-section">
          <h2 className="heading">Total User Entries</h2>
          <p className="value">
            {loading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              entryCount
            )}
          </p>
        </div>

        <div className="total-section">
          <h2 className="heading">General Sentiment</h2>
          <p className="value">
            {loading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              <span className={sentiment}>{sentimentCapitalised}</span>
            )}
          </p>
        </div>
      </div>
    );
  }
}
