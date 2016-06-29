import React, { Component, PropTypes } from 'react';

if (process.env.BROWSER) require('./App.scss');

import Nav from '../Nav';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="wrap">
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

export default App;
