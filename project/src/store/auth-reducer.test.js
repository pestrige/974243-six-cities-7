import { authReducer } from './auth-reducer';
import { ActionType } from './action';
import { AuthorizationStatus } from '../const';

describe('Auth Reducer', () => {
  it('should return initial state by default', () => {
    const initialState = {
      status: AuthorizationStatus.UNKNOWN,
      userData: {},
    };

    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should update authorization data by a given values', () => {
    const state = {
      status: AuthorizationStatus.UNKNOWN,
      userData: {},
    };
    const expectedState = {
      status: 'AUTH',
      userData: {
        token: 'some data',
        email: 'some data',
        avatarUrl: 'some data',
      },
    };
    const actionAuthorize = {
      type: ActionType.AUTHORIZE,
      payload: expectedState,
    };

    expect(authReducer(state, actionAuthorize)).toEqual(expectedState);
  });

  it('should clear authorization data', () => {
    const state = {
      status: AuthorizationStatus.AUTH,
      userData: {
        token: 'some data',
        email: 'some data',
        avatarUrl: 'some data',
      },
    };
    const actionUnAuthorize = {
      type: ActionType.UNAUTHORIZE,
    };
    const expectedState = {
      status: AuthorizationStatus.NO_AUTH,
      userData: {},
    };

    expect(authReducer(state, actionUnAuthorize)).toEqual(expectedState);
  });
});
