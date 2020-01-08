import React, { Component } from 'react';

// import images
import PositiveRobot from '../../images/robot-animation.gif';
import NegativeRobot from '../../images/angry-robot.gif';
import NeutralRobot from '../../images/neutral-robot.gif';

export default class Robot extends Component {
  constructor() {
    super();

    this.state = {
      mood: 'positive',
      animate: false
    };

    this.onSentimentReceived = this.onSentimentReceived.bind(this);
  }

  componentDidMount() {
    this.props.client.registerSentiment(this.onSentimentReceived);
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
            src={NegativeRobot}
            alt="Moogy"
            className={animate ? 'shake' : null}
          />
        ) : mood === 'positive' ? (
          <img
            src={PositiveRobot}
            alt="Moogy"
            className={animate ? 'jump' : null}
          />
        ) : (
          <img
            src={NeutralRobot}
            alt="Moogy"
            className={animate ? 'wobble' : null}
          />
        )}
      </div>
    );
  }
}
