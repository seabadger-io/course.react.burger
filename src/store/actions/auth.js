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
  return {
    type: actionTypes.AUTH_LOGOUT
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