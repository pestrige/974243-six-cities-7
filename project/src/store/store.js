import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ActionCreator } from './action';
import { reducer } from './reducer';
import { createApi } from '../services/api';

const api = createApi(
  () => store.dispatch(ActionCreator.unAuthorize()),
  (message) => store.dispatch(ActionCreator.showToast(message)),
);

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);
