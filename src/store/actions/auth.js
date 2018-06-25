import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
    email: email
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('expires');
  localStorage.removeItem('localId');
  localStorage.removeItem('email');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const setAuthContinueUrl = (url) => {
  return {
    type: actionTypes.AUTH_SET_CONTINUE_URL,
    url: url
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup = false) => {
  return (dispatch) => {
    dispatch(authStart());
    const signupUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBmt9qXIAwBStkLt7WF9EhB4awWrlhzQHk';
    const signinUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBmt9qXIAwBStkLt7WF9EhB4awWrlhzQHk';
    axios.post(isSignup ? signupUrl : signinUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .then(response => {
      console.log(response);
      localStorage.setItem('idToken', response.data.idToken);
      const expires = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('expires', expires);
      localStorage.setItem('localId', response.data.localId);
      localStorage.setItem('email', response.data.email);
      dispatch(authSuccess(
        response.data.idToken,
        response.data.localId,
        response.data.email
      ));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error.response.data.error));
    });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
      dispatch(logout());
    } else {
      const expires = new Date(localStorage.getItem('expires'));
      if (expires > new Date()) {
        dispatch(authSuccess(idToken, localStorage.getItem('localId'),
          localStorage.getItem('email')));
        dispatch(checkAuthTimeout((expires.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  };
};