import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import Popular from './components/Popular';
import Battle from './components/Battle';

class App extends React.Component {
  render() {
    return (
      <div>
        <Battle />
        <Popular />
      </div>
    );
  }
}

App.propTypes = {};

ReactDOM.render(<App />, document.getElementById('app'));
