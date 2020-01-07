import React, { Component } from 'react';
import axios from 'axios';

export default class TotalData extends Component {
  constructor() {
    super();

    this.state = {
      dataCount: 0,
      entryCount: 0,
      sentiment: '',
      positiveCount: 0,
      negativeCount: 0,
      neutralCount: 0,
      loading: true
    };
  }

  componentDidMount() {
    axios.get('/api/data/totals').then(res => {
      this.setState({
        dataCount: res.data.dataCount,
        entryCount: res.data.entryCount,
        sentiment: res.data.sentiment,
        positiveCount: res.data.positiveCount,
        neutralCount: res.data.neutralCount,
        negativeCount: res.data.negativeCount,
        loading: false
      });
    });
  }

  render() {
    const {
      dataCount,
      entryCount,
      sentiment,
      positiveCount,
      negativeCount,
      neutralCount,
      loading
    } = this.state;

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

        <div className="total-section">
          <h2 className="heading">Positive Entries</h2>
          <p className="value">
            {loading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              positiveCount
            )}
          </p>
        </div>

        <div className="total-section">
          <h2 className="heading">Neutral Entries</h2>
          <p className="value">
            {loading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              neutralCount
            )}
          </p>
        </div>

        <div className="total-section">
          <h2 className="heading">Negative Entries</h2>
          <p className="value">
            {loading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              negativeCount
            )}
          </p>
        </div>
      </div>
    );
  }
}
