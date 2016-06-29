import React, { Component, PropTypes } from 'react';

if (process.env.BROWSER) require('./App.scss');

import Nav from '../Nav';
import Footer from '../Footer';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="wrap">
        <Nav />
        <main className="valign-wrapper">
          {React.Children.only(this.props.children)}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
