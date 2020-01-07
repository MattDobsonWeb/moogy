import React, { Component } from 'react';
import axios from 'axios';
import MessageCard from './MessageCard';

export default class Train extends Component {
  constructor() {
    super();

    this.state = {
      trainingPeople: [],
      trainingInanimate: []
    };
  }

  componentDidMount() {
    axios.get('/api/data/training').then(res => {
      this.setState({
        trainingInanimate: res.data.trainingInanimate,
        trainingPeople: res.data.trainingPeople
      });
    });
  }

  render() {
    const { trainingInanimate, trainingPeople } = this.state;
    return (
      <div className="train-page">
        <div className="intro">
          <h1>Help train Moogy.</h1>
          <p>
            Moogy isn't always able to pick up the sentiment of a users
            response, he's still learning. That's where we need your help. Below
            are some messages that no sentiment has been found for, tell us what
            the sentiment is to help train Moogy!
          </p>
        </div>

        <div className="training-messages">
          <div className="training-section">
            <h2>Opinions - Person</h2>

            <div className="messages">
              {trainingPeople.map(message => (
                <MessageCard message={message} type="person"></MessageCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
