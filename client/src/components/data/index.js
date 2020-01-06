import React, { Component } from 'react';

// import components
import People from './People';
import Inanimate from './Inanimate';

export default class index extends Component {
  render() {
    return (
      <div className="data-page">
        <div className="data-grid">
          <People></People>
          <Inanimate></Inanimate>
        </div>
      </div>
    );
  }
}
