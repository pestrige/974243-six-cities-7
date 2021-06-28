import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ActionCreator } from './action';
import { reducer } from './reducer';
import { redirect } from './middlewares/redirect';
import { createApi } from '../services/api';

const api = createApi(
  () => store.dispatch(ActionCreator.unAuthorize()),
);

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);
