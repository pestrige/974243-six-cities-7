import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import Offers from './offers';

describe('component Offers', () => {
  it('should render correctly with default values', () => {
    const mockStore = configureStore();
    const history = createMemoryHistory();
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH'},
      DATA: {isDataLoaded: {offers: true}},
      FORM: {isSending: false},
    };
    const offers = [
      {id: 1, isFavorite: false},
      {id: 2, isFavorite: false},
      {id: 3, isFavorite: false},
    ];
    const type = 'cities';

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Offers
            offers={offers}
            type={type}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('article').length).toBe(offers.length);
    expect(screen.getByTestId('offers-container')).toHaveClass(`${type}__list places__list tabs__content`);
  });

  it('should render correctly while offers is loading', () => {
    const mockStore = configureStore();
    const history = createMemoryHistory();
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH'},
      DATA: {isDataLoaded: {offers: false}},
      FORM: {isSending: false},
    };
    const offers = [];
    const type = 'cities';

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Offers
            offers={offers}
            type={type}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByTestId('card-loading')).toBeTruthy();
  });
});
