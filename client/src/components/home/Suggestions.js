import React, { Component } from 'react';

const fixedSuggestions = ['Hi there!', 'How are you?', 'Why were you created?'];

const suggestions = [
  'What do you think of Donald Trump?',
  'What do you think of Matt Dobson?',
  'Do you like football?',
  'Do you like reading?',
  'Do you like gaming?'
];

export default class Suggestions extends Component {
  constructor() {
    super();

    this.state = {
      fixedSuggestions: fixedSuggestions,
      suggestions: suggestions
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
