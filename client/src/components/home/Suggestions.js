import React, { Component } from 'react';

const fixedSuggestions = ['Hi there!', 'How are you?', 'Who are you?'];

const suggestions = [
  'What do you think of Donald Trump?',
  'What do you think of Boris Johnson?',
  'Do you like football?',
  'Do you like reading?',
  'Do you like gaming?',
  'Do you like Freddie Mercury?',
  'Do you like Tom Hanks?',
  'Do you like the queen?',
  'Do you like Einstein?',
  'Do you like shopping?',
  'Who is your favourite artist?',
  'Who is your favourite actor?',
  'Who is your favourite band?',
  'Who is your favourite footballer?',
  'What do you think of hiking?',
  'Do you like chess?',
  'Do you like board games?',
  'Do you like beer?',
  'What do you think of rock music?',
  'Do you like coffee?',
  'What is your favourite food?',
  'What is your favourite hobby?',
  'Do you like music?',
  'Do you like to dance?',
  'What is your favourite car?',
  'What is your favourite takeaway?',
  'What is your favourite drink?'
];

const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export default class Suggestions extends Component {
  constructor() {
    super();

    this.state = {
      fixedSuggestions: fixedSuggestions,
      suggestions: shuffle(suggestions)
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, list, index) {
    e.preventDefault();

    if (list === 'fixedSuggestions') {
      const suggestions = this.state.fixedSuggestions;
      suggestions.splice(index, 1);

      this.setState({ fixedSuggestions: suggestions });
    } else {
      const suggestions = this.state.suggestions;
      suggestions.splice(index, 1);

      this.setState({ suggestions: suggestions });
    }

    this.props.onSuggestionClick(e.target.value);
  }

  render() {
    return (
      <div className="message-suggestions">
        {this.state.fixedSuggestions.map((message, index) => (
          <button
            className="btn-light"
            onClick={e => this.handleClick(e, 'fixedSuggestions', index)}
            value={message}
            key={index}
          >
            {message}
          </button>
        ))}

        {this.state.suggestions.map((message, index) => (
          <button
            className="btn-light"
            onClick={e => this.handleClick(e, 'suggestions', index)}
            value={message}
            key={index}
          >
            {message}
          </button>
        ))}
      </div>
    );
  }
}
