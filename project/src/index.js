import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { adaptOffersToClient } from './utils/adapters';
import { OFFERS } from './mocks/offers';

const offers = adaptOffersToClient(OFFERS);

ReactDOM.render(
  <React.StrictMode>
    <App
      offers = {offers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
