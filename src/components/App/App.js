import React, { Component, PropTypes } from 'react';

if (process.env.BROWSER) require('./App.scss');

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="wrap">
        <nav>Nav</nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
