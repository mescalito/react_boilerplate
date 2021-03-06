import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa';
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

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues,
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url} className="repo bg-light">
            <h4 className="header-lg center-text">#{index + 1}</h4>
            <img
              className="avatar"
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <h2 className="center-text">
              <a className="link" href={html_url}>
                {login}
              </a>
            </h2>
            <ul className="card-list">
              <li>
                <FaUser color="rgb(255, 191, 116)" size={22} />
                <a href={`https://github.com/${login}`}>{login}</a>
              </li>
              <li>
                <FaStar color="rgb(255, 215, 0)" size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                {open_issues.toLocaleString()} open
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
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
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </React.Fragment>
    );
  }
}
