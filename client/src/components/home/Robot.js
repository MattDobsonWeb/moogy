import React, { Component } from 'react';
import socket from '../../socket';

import DefaultRobot from '../../images/robot-animation.gif';
import AngryRobot from '../../images/angry-robot.gif';

export default class Robot extends Component {
  constructor() {
    super();

    this.state = {
      client: socket(),
      mood: 'positive',
      animate: false
    };

    this.onSentimentReceived = this.onSentimentReceived.bind(this);
  }

  componentDidMount() {
    this.state.client.registerSentiment(this.onSentimentReceived);
  }

  onSentimentReceived(sentiment) {
    this.setState({ mood: sentiment, animate: true });

    setTimeout(
      function() {
        this.setState({ animate: false });
      }.bind(this),
      2000
    );
  }

  render() {
    const { mood, animate } = this.state;

    return (
      <div className="robot-wrapper">
        {mood === 'negative' ? (
          <img
            src={AngryRobot}
            alt="Moogy"
            className={animate ? 'shake' : null}
          />
        ) : (
          <img
            src={DefaultRobot}
            alt="Moogy"
            className={animate ? 'jump' : null}
          />
        )}
      </div>
    );
  }
}
