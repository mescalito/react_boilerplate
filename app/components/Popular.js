import React, { Component } from 'react';

export default class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
    };
  }

  updateLanguage(l) {
    this.setState({ selectedLanguage: l });
  }

  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
      <ul className="flex-center">
        {languages.map(language => (
          <li key={language}>
            <button
              type="button"
              onClick={() => this.updateLanguage(language)}
              className="btn-clear nav-link"
              style={
                language === this.state.selectedLanguage
                  ? { color: 'red' }
                  : null
              }
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
