import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Login from './login';

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
});
