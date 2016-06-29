import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import login from '../../redux/actions/login';

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(e) {
    e.preventDefault();
    this.props.onLogin(this.refs.email.value, this.refs.password.value);
  }

  render() {
    return (
      <div className="login row valign-wrapper">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="z-depth-1">
            <form
              className="container"
              onSubmit={this.onLogin}
              method="post"
            >
              <div className="input-field">
                <i className="material-icons prefix">email</i>
                <input id="email" type="email" className="validate" name="email" ref="email" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <i className="material-icons prefix">lock</i>
                <input
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  ref="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <p>
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember Me</label>
              </p>
              <div className="center-align">
                <button
                  className="btn waves-effect waves-light center-align"
                  type="submit"
                  name="action"
                >
                  Login <i className="material-icons right">send</i>
                </button>
              </div>
              <p className="center-align">
                <a href="/forgot">Forgot Password</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state) => ({ profile: state.profile });
const mapDispatchToProps = (dispatch) => (
  {
    onLogin: async (email, password) => {
      const r = await dispatch(login(email, password));
      console.log(r);
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
