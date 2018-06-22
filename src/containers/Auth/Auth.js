import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class Auth extends Component {
  state = {
    authData: {},
    formIsValid: false,
    isSignup: false
  }

  formDefinition = {
    email: {
      inputType: 'input',
      label: 'Email',
      attributes: {
        id: 'email',
        name: 'email',
        type: 'email',
        placeholder: 'Your email',
      },
      value: '',
      valid: false,
      validations: {
        required: true,
        isEmail: true
      },
      touched: false
    },
    password: {
      inputType: 'input',
      label: 'Password',
      attributes: {
        id: 'password',
        name: 'password',
        type: 'password',
        placeholder: 'Enter password',
      },
      value: '',
      valid: false,
      validations: {
        required: true,
        minLength: 6
      },
      touched: false
    }
  }

  componentDidMount = () => {
    const authData = {};
    Object.keys(this.formDefinition).forEach(key => authData[key] = this.formDefinition[key].value);
    this.setState( { authData: authData });
  }

  validateInput = (inputKey, value) => {
    const validations = this.formDefinition[inputKey].validations;
    if (typeof validations !== 'object' || validations === null) return true;
    for (const validation in validations) {
      if (validation === 'required' && validations[validation]) {
        if (value.trim() === '') return false;
      }
      if (validation === 'minLength') {
        if (value.length < validations[validation]) return false;
      }
      if (validation === 'maxLength') {
        if (value.length > validations[validation]) return false;
      }
      if (validation === 'isEmail' && validations[validation]) {
        if (!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return false;
      }
    }
    return true;
  }

  validateForm = () => {
    for (const key in this.formDefinition) {
      if (! this.formDefinition[key].valid) {
        return this.setState({ formIsValid: false });
      }
    }
    this.setState({ formIsValid: true });
  }

  inputChangeHandler = (inputKey, event) => {
    const authData = this.state.authData;
    authData[inputKey] = event.target.value;
    this.formDefinition[inputKey].touched = true;
    this.formDefinition[inputKey].valid = this.validateInput(inputKey, event.target.value);
    this.validateForm();
    this.setState({ authData: authData });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.authData.email,
      this.state.authData.password,
      this.state.isSignup
    );
  }

  switchSignUp = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        isSignup: ! prevState.isSignup
      };
    });
  };

  errorMessages = {
    EMAIL_NOT_FOUND: 'Login failed',
    INVALID_EMAIL: 'Invalid email address',
    INVALID_PASSWORD: 'Login failed',
    USER_DISABLED: 'Your account is disabled',
    EMAIL_EXISTS: 'User already exists',
    DEFAULT: 'Login failed'
  }

  render() {
    if (this.props.isAuthenticated) {
      const redirectUrl = this.props.continueUrl;
      this.props.setAuthContinueUrl('/');
      return <Redirect to={redirectUrl} />;
    }
    if (this.props.loading) {
      return <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      const errorMessageText = this.errorMessages[this.props.error.message] ?
        this.errorMessages[this.props.error.message] :
        this.errorMessages['DEFAULT'];

      errorMessage = (
        <p className={classes.Error}>{errorMessageText}</p>
      );
    }
    return (
      <div className={classes.Auth}>
        <form valid={this.state.formIsValid.toString()} onSubmit={this.submitHandler}>
            {
              Object.keys(this.formDefinition).map((key) => {
                return (
                  <Input {...this.formDefinition[key]}
                    key={key}
                    onChange={(event) => { this.inputChangeHandler(key, event) }}
                    value={this.state.authData[key]}
                  />
                );
              })
            }
            <Button btnType="Success" disabled={!this.state.formIsValid}>
              {this.state.isSignup ? 'Sign up' : 'Sign in'}
            </Button>
        </form>
        {errorMessage}
        <Button btnType="Danger" clicked={this.switchSignUp}>
          Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}
        </Button>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    email: state.auth.email,
    isAuthenticated: state.auth.idToken !== null,
    continueUrl: state.auth.continueUrl
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    setAuthContinueUrl: (url) => dispatch(actions.setAuthContinueUrl(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
