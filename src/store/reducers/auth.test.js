import reducer from './auth';
import { initialState } from './auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth reducer', () => {

  it('should return the initial state on unknown action', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store token, user id and email on login', () => {
    const payload = {
      idToken: '123456',
      userId: 'user1',
      email: 'a@a.com'
    };
    expect(reducer(undefined, {
      type: actionTypes.AUTH_SUCCESS,
      ...payload
    })).toEqual({
      ...initialState,
      ...payload
    });
  });
});