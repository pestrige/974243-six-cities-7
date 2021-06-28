import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { checkAuth, fetchOffers } from './store/api-action';
import App from './components/app/app';

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
