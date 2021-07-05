import { createReducer } from '@reduxjs/toolkit';
import { authorize, unAuthorize } from './action';
import { AuthorizationStatus } from '../const';

const initialState = {
  status: AuthorizationStatus.UNKNOWN,
  userData: {},
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authorize, (state, action) => {
      state.status = action.payload.status;
      state.userData = action.payload.userData;
    })
    .addCase(unAuthorize, (state) => {
      state.status = AuthorizationStatus.NO_AUTH;
      state.userData = {};
    });
});
