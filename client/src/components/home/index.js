import React, { Component } from 'react';

// import components
import Chatbox from './Chatbox';
import Robot from '../../images/robot-animation.gif';

export default class index extends Component {
  render() {
    return (
      <>
        <div className="main-content">
          <div className="center-content">
            <Chatbox></Chatbox>

            <div className="robot-wrapper">
              <img src={Robot} alt="Moogy" />
            </div>
          </div>

          <div className="message-suggestions">
            <button className="btn-light">
              What do you think of Donald Trump?
            </button>

            <button className="btn-light">Do you like coffee?</button>

            <button className="btn-light">What are you up to?</button>

            <button className="btn-light">Who created you?</button>

            <button className="btn-light">Do you like football?</button>

            <button className="btn-light">Who are you?</button>

            <button className="btn-light">Do you like coffee?</button>

            <button className="btn-light">What are you up to?</button>

            <button className="btn-light">Who created you?</button>

            <button className="btn-light">Do you like football?</button>

            <button className="btn-light">Who are you?</button>

            <button className="btn-light">Do you like football?</button>

            <button className="btn-light">Who are you?</button>

            <button className="btn-light">Do you like coffee?</button>

            <button className="btn-light">What are you up to?</button>

            <button className="btn-light">Who created you?</button>

            <button className="btn-light">Do you like football?</button>

            <button className="btn-light">Who are you?</button>
          </div>
        </div>
      </>
    );
  }
}
