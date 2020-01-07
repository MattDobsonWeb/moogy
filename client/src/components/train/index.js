import React, { Component } from 'react';
import axios from 'axios';
import MessageCard from './MessageCard';
import Loading from '../common/Loading';

export default class Train extends Component {
  constructor() {
    super();

    this.state = {
      trainingPeople: [],
      trainingInanimate: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get('/api/data/training').then(res => {
      this.setState({
        trainingInanimate: res.data.trainingInanimate,
        trainingPeople: res.data.trainingPeople,
        loading: false
      });
    });
  }

  render() {
    const { trainingInanimate, trainingPeople, loading } = this.state;

    return (
      <div className="train-page">
        <div className="intro">
          <h1>Help train Moogy</h1>
          <p>
            Moogy isn't always able to pick up the sentiment of a users
            response, he's still learning. That's where we need your help. Below
            are some messages that no sentiment has been found for, tell us what
            the sentiment is to help train Moogy!
          </p>
        </div>

        {trainingInanimate.length === 0 &&
          trainingPeople.length === 0 &&
          !loading && (
            <div
              className="message-card"
              style={{ textAlign: 'center', marginTop: '30px' }}
            >
              <h3>
                There is currently no data that needs training. Please check
                back at some other time!
              </h3>
            </div>
          )}

        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="training-messages">
            {trainingPeople.length > 0 && (
              <div className="training-section">
                <h2>Opinions - Person</h2>

                <div className="messages">
                  {trainingPeople.map(message => (
                    <MessageCard message={message} type="person"></MessageCard>
                  ))}
                </div>
              </div>
            )}

            {trainingInanimate.length > 0 && (
              <div className="training-section">
                <h2>Opinions - Inanimate</h2>

                <div className="messages">
                  {trainingInanimate.map(message => (
                    <MessageCard
                      message={message}
                      type="inanimate"
                    ></MessageCard>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
