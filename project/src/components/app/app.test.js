import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {AppRoute} from '../../const';
import App from './app';

const cities = [
  {name: 'Paris'},
  {name: 'Cologne'},
  {name: 'Brussels'},
  {name: 'Amsterdam'},
  {name: 'Hamburg'},
  {name: 'Dusseldorf'},
];

const history = createMemoryHistory();
const fakeStore = configureStore();
const fakeStoreData = {
  AUTH: {status: 'NO_AUTH', userData: {}},
  DATA: {offers: [], isDataLoaded: {offers: true}},
  APP: {cities, city: {name: 'Paris'}, sortType: {name: 'default', text: 'Popular'}},
  ERROR: {toast: {isShown: false}},
  FORM: {isSending: false},
};
const authData = {status: 'AUTH', userData: {email: 'test@test.com', avatarUrl: '/img/1.png'}};

describe('App Routing', () => {
  it('should render Main screen when navigate to "/"', () => {
    history.push(AppRoute.ROOT);
    render(
      <Provider store={fakeStore(fakeStoreData)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Cities');
  });

  it('should render Login screen when navigate to "/login"', () => {
    history.push(AppRoute.LOGIN);
    render(
      <Provider store={fakeStore(fakeStoreData)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
  });

  it('should render Main screen when navigate to "/login" with successful authorization', () => {
    history.push(AppRoute.ROOT);
    history.push(AppRoute.LOGIN);
    const newFakeStoreData = {
      ...fakeStoreData,
      AUTH: authData,
    };

    render(
      <Provider store={fakeStore(newFakeStoreData)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Cities');
  });

  it('should render Login screen when navigate to "/favorites" with no authorization', () => {
    history.push(AppRoute.FAVORITES);

    render(
      <Provider store={fakeStore(fakeStoreData)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
  });

  it('should render 404 screen when navigate to "/404"', () => {
    history.push(AppRoute.NOT_FOUND);
    render(
      <Provider store={fakeStore(fakeStoreData)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Page not found');
  });

  it('should render 404 screen when navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(
      <Provider store={fakeStore(fakeStoreData)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Page not found');
  });
});
