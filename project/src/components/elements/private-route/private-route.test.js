import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import PrivateRoute from './private-route';

const mockStore = configureStore({});
const history = createMemoryHistory();

describe('Component PrivateRoute', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render login component when user not authorized', () => {
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH'},
    };
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Switch>
            <PrivateRoute
              exact
              path={'/login'}
              render={() => <h1>Login Component</h1>}
              isPrivate={false}
            />
            <PrivateRoute
              exact
              path={'/private'}
              render={() => <h1>Private Component</h1>}
              isPrivate
            />
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Login Component')).toBeInTheDocument();
    expect(screen.queryByText('Private Component')).not.toBeInTheDocument();
  });


  it('should render private component when user authorized', () => {
    const storeFakeData = {
      AUTH: {status: 'AUTH'},
    };
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Switch>
            <PrivateRoute
              exact
              path={'/login'}
              render={() => <h1>Login Component</h1>}
              isPrivate={false}
            />
            <PrivateRoute
              exact
              path={'/private'}
              render={() => <h1>Private Component</h1>}
            />
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Private Component')).toBeInTheDocument();
    expect(screen.queryByText('Login Component')).not.toBeInTheDocument();
  });

  it('should go back to main component when authorized user go to /login', () => {
    const storeFakeData = {
      AUTH: {status: 'AUTH'},
    };
    history.push('/');
    history.push('/login');

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Switch>
            <PrivateRoute
              exact
              path={'/login'}
              render={() => <h1>Login Component</h1>}
              isPrivate={false}
            />
            <PrivateRoute
              exact
              path={'/private'}
              render={() => <h1>Private Component</h1>}
            />
            <Route exact path={'/'}>
              <h1>Main Component</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Main Component')).toBeInTheDocument();
    expect(screen.queryByText('Login Component')).not.toBeInTheDocument();
    expect(screen.queryByText('Private Component')).not.toBeInTheDocument();
  });
});
