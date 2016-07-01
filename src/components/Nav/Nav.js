import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
  renderSignedOut() {
    return (
      <header>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Logo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

  renderSignedIn() {
    return (
      <header>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Logo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

  render() {
    return this.renderSignedIn();
  }
}

export default Nav;
