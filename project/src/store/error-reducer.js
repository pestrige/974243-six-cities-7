import { createReducer } from '@reduxjs/toolkit';
import { showToast, hideToast, addError, clearError } from './action';

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

export const errorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showToast, ({toast}, action) => {
      toast.isShown = true;
      toast.message = action.payload;
    })
    .addCase(hideToast, ({toast}) => {
      toast.isShown = false;
      toast.message = '';
    })
    .addCase(addError, ({error}, action) => {
      error.status = action.payload.status;
      error.text = action.payload.text;
    })
    .addCase(clearError, ({error}) => {
      error.status = null;
      error.text = '';
    });
});
