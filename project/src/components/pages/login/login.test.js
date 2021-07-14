import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import Login from './login';
import * as apiActions from '../../../store/api-action';

jest.mock('../../elements/header/header', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Header</div>;
  },
}));

const mockStore = configureStore();
const storeFakeData = {
  AUTH: {userData: {}},
  APP: {city: {name: 'Paris'}},
  ERROR: {toast: {isShown: false}},
};

describe('Component Login', () => {
  it('should render login screen when navigate to /login', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is the mock Header')).toBeInTheDocument();
    expect(screen.getByTestId('login-title')).toHaveTextContent('Sign in');
    expect(screen.getByTestId('login-button')).toHaveTextContent('Sign in');
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'test@test.com');
    userEvent.type(screen.getByTestId('password'), '12345');
    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
  });

  it('should redirect to / when click to city button', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/login'}>
              <Login />
            </Route>
            <Route exact path={'/'}>
              <h1>This is the mock Main screen</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('This is the mock Main screen')).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText('This is the mock Main screen')).toBeInTheDocument();
  });

  it('should handle data when form submited', () => {
    const history = createMemoryHistory();
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const login = jest.spyOn(apiActions, 'login');

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('login'), 'test@test.com');
    userEvent.type(screen.getByTestId('password'), '12345');
    userEvent.click(screen.getByTestId('login-button'));
    expect(dispatch).toBeCalled();
    expect(login).toBeCalledWith({
      login: 'test@test.com',
      password: '12345',
    });
  });
});
