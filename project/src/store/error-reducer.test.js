import { ActionType } from './action';
import { errorReducer } from './error-reducer';

describe('Error reducer', () => {
  it('should return the initial state by default', () => {
    const initialState = {
      toast: {
        isShown: false,
        message: '',
      },
      error: {
        status: null,
        text: '',
      },
    };

    expect(errorReducer(undefined, {})).toEqual(initialState);
  });

  it('should show toast with a given message', () => {
    const state = {toast: {
      isShown: false,
      message: '',
    }};
    const message = 'a fatal error message';
    const showToastAction = {
      type: ActionType.SHOW_TOAST,
      payload: message,
    };
    const expectedState = {toast: {
      isShown: true,
      message,
    }};

    expect(errorReducer(state, showToastAction)).toEqual(expectedState);
  });

  it('should hide toast', () => {
    const state = {toast: {
      isShown: true,
      message: 'some error message',
    }};
    const showToastAction = {
      type: ActionType.HIDE_TOAST,
    };
    const expectedState = {toast: {
      isShown: false,
      message: '',
    }};

    expect(errorReducer(state, showToastAction)).toEqual(expectedState);
  });

  it('should add error', () => {
    const state = {error: {
      status: null,
      text: '',
    }};
    const error = {status: '400', text: 'Bad Request'};
    const addErrorAction = {
      type: ActionType.ADD_ERROR,
      payload: error,
    };
    const expectedState = {error};

    expect(errorReducer(state, addErrorAction)).toEqual(expectedState);
  });

  it('should clear error', () => {
    const state = {error: {
      status: '400',
      text: 'Bad Request',
    }};
    const clearErrorAction = {
      type: ActionType.CLEAR_ERROR,
    };
    const expectedState = {error: {
      status: null,
      text: '',
    }};

    expect(errorReducer(state, clearErrorAction)).toEqual(expectedState);
  });
});
