import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './App.scss';

import Nav from '../Nav';
import Footer from '../Footer';

// TODO: Set Title!
@withStyles(s)
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
