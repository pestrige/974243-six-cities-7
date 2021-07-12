import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import City from './city';

const mockStore = configureStore();
const history = createMemoryHistory();

describe('component City', () => {
  it('should render correctly', () => {
    const cityName = 'Paris';
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

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <City
            cityName={cityName}
            offers={offers}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(cityName)).toBeInTheDocument();
    const cardsCount = screen.getAllByRole('article').length;
    expect(cardsCount === offers.length).toBeTruthy();
  });
});
