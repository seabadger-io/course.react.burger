import * as actionTypes from '../actions/actionTypes';

const initialState = {
  idToken: null,
  userId: null,
  email: null,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        idToken: action.idToken,
        userId: action.userId,
        email: action.email,
        error: null
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
