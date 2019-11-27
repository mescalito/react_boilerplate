import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class App extends React.Component {
  render() {
    const { name } = this.props;
    return <h1>Hello {name}!</h1>;
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
};

ReactDOM.render(<App name="nico" />, document.getElementById('app'));
