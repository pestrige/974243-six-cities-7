import { configureStore } from '@reduxjs/toolkit';
import { unAuthorize, showToast } from './action';
import rootReduser from './root-reduser';
import { createApi } from '../services/api';

const api = createApi(
  () => store.dispatch(unAuthorize()),
  (message) => store.dispatch(showToast(message)),
);

export const store = configureStore({
  reducer: rootReduser,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
    serializableCheck: false,
  }),
});
