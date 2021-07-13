import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Header } from './header';

const history = createMemoryHistory();
const mockStore = configureStore();
jest.mock('../toast/toast', () => ({
  __esModule: true,
  default() {
    return <h1>This is mock toast</h1>;
  },
}));

describe('Component Header', () => {
  it('should render correctly without authorization', () => {
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH', userData: {}},
      ERROR: {toast: {isShown: false}},
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
      ERROR: {toast: {isShown: false}},
    };

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('listitem')[0]).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should change logo class after redirect to /', () => {
    const storeFakeData = {
      AUTH: {
        status: 'NO_AUTH',
        userData: {},
      },
      ERROR: {toast: {isShown: false}},
    };
    history.push('/login');

    const {container, rerender} = render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Switch>
            <Route path={'/login'}>
              <Header />
            </Route>
            <Route>
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    const navLink = container.querySelector('.header__logo');
    expect(navLink).not.toHaveClass('header__logo-link--active');
    userEvent.click(navLink);
    rerender(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );
    expect(container.querySelector('.header__logo-link--active')).toBeInTheDocument();
  });

  it('should show toast when shown flag is active', () => {
    const storeFakeData = {
      AUTH: {
        status: 'NO_AUTH',
        userData: {},
      },
      ERROR: {toast: {isShown: true}},
    };
    history.push('/login');

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is mock toast')).toBeInTheDocument();
  });
});
