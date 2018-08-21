import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { AUTH_TOKEN } from '../utils/constants';

// mutations
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../mutations/login.mutation';


class Auth extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  }

  onChange = event => {
      this.setState({
          [event.target.name]: event.target.value
      });
  }

  _confirm = async (data) => {
    // ... you'll implement this 🔜
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    this.props.history.push(`/`);
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  render() {
    const { login, email, password, name } = this.state
    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              onChange={this.onChange}
              type="text"
              name="name"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            onChange={this.onChange}
            type="text"
            name="email"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={this.onChange}
            type="password"
            name="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => (
            <div className="pointer mr2 button" onClick={mutation}>
              {login ? 'login' : 'create account'}
            </div>
          )}
        </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;