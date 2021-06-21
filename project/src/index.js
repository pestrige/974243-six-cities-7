import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './store/reducer';

import { adaptOffersToClient } from './utils/adapters';
import { OFFERS } from './mocks/offers';

const offers = adaptOffersToClient(OFFERS);
const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers = {offers}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
