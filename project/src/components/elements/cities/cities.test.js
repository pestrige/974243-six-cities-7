import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Cities } from './cities';

const cities = [
  {name: 'Paris'},
  {name: 'Cologne'},
  {name: 'Brussels'},
  {name: 'Amsterdam'},
  {name: 'Hamburg'},
  {name: 'Dusseldorf'},
];
const citiesCount = Object.values(cities).length;
const storeFakeData = {
  APP: {
    city: {name: 'Paris'},
    cities,
  },
};
const mockStore = configureStore();
const history = createMemoryHistory();

describe('Component Cities', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Cities />
        </Router>
      </Provider>,
    );

    const isCityLinksCountCorrect = screen.getAllByRole('link').length === citiesCount;
    expect(isCityLinksCountCorrect).toBeTruthy();
  });
});
