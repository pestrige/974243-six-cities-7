import { formReducer } from './form-reducer';
import { ActionType } from './action';

describe('Error Reducer', () => {
  it('should return the initial state by default', () => {
    const initialState = {
      isSending: false,
      data: {
        rating: null,
        comment: '',
      },
    };

    expect(formReducer(undefined, {})).toEqual(initialState);
  });

  it('should set a sending flag depending on the boolean value passed', () => {
    const state = {isSending: false};
    const getSetFlagAction = (flag) => ({
      type: ActionType.SET_SENDING_FLAG,
      payload: flag,
    });

    expect(formReducer(state, getSetFlagAction(true))).toEqual({isSending: true});
    expect(formReducer(state, getSetFlagAction(false))).toEqual({isSending: false});
  });

  it('should update a form data to the passed values', () => {
    const state = {data: {
      rating: null,
      comment: '',
    }};

    const formData = {
      rating: 5,
      comment: 'some comment',
    };
    const setFormAction = {
      type: ActionType.SET_FORM,
      payload: formData,
    };

    expect(formReducer(state, setFormAction)).toEqual({data: formData});
  });

  it('should clear a form data', () => {
    const state = {data: {
      rating: 5,
      comment: 'some comment',
    }};

    const clearFormAction = {
      type: ActionType.CLEAR_FORM,
    };
    const expectedState = {data: {
      rating: null,
      comment: '',
    }};

    expect(formReducer(state, clearFormAction)).toEqual(expectedState);
  });
});
