import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AppRoute } from '../../const';
import App from './app';

jest.mock('../pages/favorites/favorites', () => {
  const mockComponent = () => <>This is mock Favories Screen</>;
  return {
    __esModule: true,
    default: mockComponent,
  };
});
jest.mock('../pages/main/main', () => ({
  __esModule: true,
  default() {
    return <>This is mock Main Screen</>;
  },
}));
jest.mock('../pages/login/login', () => ({
  __esModule: true,
  default() {
    return <>This is mock Login Screen</>;
  },
}));
jest.mock('../pages/offer/offer', () => ({
  __esModule: true,
  default() {
    return <>This is mock Offer Screen</>;
  },
}));
jest.mock('../pages/not-found/not-found', () => ({
  __esModule: true,
  default() {
    return <>This is mock NotFound Screen</>;
  },
}));

const history = createMemoryHistory();
const fakeStore = configureStore();
const fakeStoreData = {
  AUTH: {status: 'NO_AUTH'},
};

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

    expect(screen.getByText('This is mock Main Screen')).toBeInTheDocument();
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

    expect(screen.getByText('This is mock Login Screen')).toBeInTheDocument();
  });

  it('should render Main screen when navigate to "/login" with successful authorization', () => {
    history.push(AppRoute.ROOT);
    history.push(AppRoute.LOGIN);

    render(
      <Provider store={fakeStore({AUTH: {status: 'AUTH'}})}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is mock Main Screen')).toBeInTheDocument();
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

    expect(screen.getByText('This is mock Login Screen')).toBeInTheDocument();
  });

  it('should render Favorite screen when navigate to "/favorites" with successful authorization', () => {
    history.push(AppRoute.FAVORITES);

    render(
      <Provider store={fakeStore({AUTH: {status: 'AUTH'}})}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is mock Favories Screen')).toBeInTheDocument();
  });

  it('should render Offer screen when navigate to /offer/:id route', () => {
    history.push(`${AppRoute.OFFER}/1`);
    render(
      <Provider store={fakeStore(fakeStoreData)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is mock Offer Screen')).toBeInTheDocument();
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

    expect(screen.getByText('This is mock NotFound Screen')).toBeInTheDocument();
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

    expect(screen.getByText('This is mock NotFound Screen')).toBeInTheDocument();
  });
});
