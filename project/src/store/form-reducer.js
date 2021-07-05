import { createReducer } from '@reduxjs/toolkit';
import { setSendingFlag, setForm, clearForm } from './action';

const initialState = {
  isSending: false,
  data: {
    rating: null,
    comment: '',
  },
};

export const formReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSendingFlag, (state, action) => {
      state.isSending = action.payload;
    })
    .addCase(setForm, ({data}, action) => {
      data.rating = action.payload.rating;
      data.comment = action.payload.comment;
    })
    .addCase(clearForm, ({data}) => {
      data.rating = null;
      data.comment = '';
    });
});
