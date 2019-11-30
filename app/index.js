import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import Popular from './components/Popular';

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <Popular />
      </div>
    );
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
};

ReactDOM.render(<App name="nico" />, document.getElementById('app'));
