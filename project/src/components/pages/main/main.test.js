import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import Main from './main';

const history = createMemoryHistory();
const mockStore = configureStore();
const offers = [
  {id: 1, isFavorite: false, location: {latitude: 48.85661, longitude: 2.351499, zoom: 13}, city: {name: 'Paris'}},
  {id: 2, isFavorite: false, location: {latitude: 48.85661, longitude: 2.351499, zoom: 13}, city: {name: 'Paris'}},
  {id: 3, isFavorite: false, location: {latitude: 48.85661, longitude: 2.351499, zoom: 13}, city: {name: 'Paris'}},
];
const cities = [
  {name: 'Paris'},
  {name: 'Cologne'},
  {name: 'Brussels'},
  {name: 'Amsterdam'},
  {name: 'Hamburg'},
  {name: 'Dusseldorf'},
];
const sortType = {name: 'default', text: 'Popular'};
const storeFakeData = {
  AUTH: {status: 'NO_AUTH'},
  DATA: {offers, isDataLoaded: {offers: true}},
  APP: {city: {name: 'Paris', location: {latitude: 48.85661, longitude: 2.351499, zoom: 13}}, sortType, cities},
  FORM: {isSending: false},
  ERROR: {toast: {message: '', isShown: false}},
};

describe('Component Main', () => {
  it('should render correctly with default values', () => {
    const {APP, DATA} = storeFakeData;

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('main-page')).toHaveClass('page page--gray page--main', {exact: true});
    expect(screen.getByTestId('places-container')).toHaveClass('cities__places-container container', {exact: true});
    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText(`${DATA.offers.length} places to stay in ${APP.city.name}`)).toBeInTheDocument();
  });

  it('should render correctly with no offers', () => {
    const fakeDataWithNoOffers = {
      ...storeFakeData,
      DATA: {...storeFakeData.DATA, offers: []},
    };

    render(
      <Provider store={mockStore(fakeDataWithNoOffers)}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('main-page')).toHaveClass('page page--gray page--main page__main--index-empty', {exact: true});
    expect(screen.getByTestId('places-container')).toHaveClass('cities__places-container container cities__places-container--empty', {exact: true});
    expect(screen.getByTestId('cities-empty-container')).toBeInTheDocument();
  });

  it('should render correctly while data is loading', () => {
    const fakeDataWithLoading = {
      ...storeFakeData,
      DATA: {...storeFakeData.DATA, isDataLoaded: {offers: false}},
    };

    render(
      <Provider store={mockStore(fakeDataWithLoading)}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Places are loading ...')).toBeInTheDocument();
    expect(screen.getByTestId('offers-container')).toBeInTheDocument();
  });

});
