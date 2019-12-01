import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchPopularRepos from '../utils/api';

function LanguagesNav({ updateLanguage, selectedLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            type="button"
            onClick={() => updateLanguage(language)}
            className="btn-clear nav-link"
            style={language === selectedLanguage ? { color: 'red' } : null}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
};

export default class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null,
    };
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    const { selectedLanguage } = this.state;
    this.updateLanguage(selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
    });
    // if data for selected repo doesn't exist then we
    // fetch data for thatrepo ans add it to
    // repos-object to be cache into state
    if (!this.state.repos[selectedLanguage]) {
      // get data
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          // get previous state
          this.setState(({ repos }) => ({
            // add new data for the repo into the repos-state-object
            repos: { ...repos, [selectedLanguage]: data },
          }));
        })
        .catch(error => {
          console.warn('Error fetching repos: ', error);
          this.setState({
            error: `There was an error fetching the repositories.`,
          });
        });
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav
          updateLanguage={this.updateLanguage}
          selectedLanguage={selectedLanguage}
        />
        {this.isLoading() && <p>LOADING</p>}
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && (
          <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>
        )}
      </React.Fragment>
    );
  }
}
