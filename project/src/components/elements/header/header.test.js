import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Header } from './header';

const history = createMemoryHistory();
const mockStore = configureStore();

describe('Component Header', () => {
  it('should render correctly without authorization', () => {
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH', userData: {}},
      ERROR: {toast: {isToastShown: false}},
    };

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render correctly after authorization', () => {
    const storeFakeData = {
      AUTH: {
        status: 'AUTH',
        userData: {},
      },
      ERROR: {toast: {isToastShown: false}},
    };

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('user-info')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
