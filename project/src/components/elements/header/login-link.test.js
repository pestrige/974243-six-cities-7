import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LoginLink from './login-link';

describe('component LoginLink', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <LoginLink />
      </Router>,
    );
    const linkElement = getByText('Sign in');

    expect(linkElement).toBeInTheDocument();
  });

  it('should redirect to /login when click', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Switch>
          <Route path={'/login'}>
            <h1>This is mock login</h1>
          </Route>
          <Route>
            <LoginLink />
          </Route>
        </Switch>
      </Router>,
    );
    userEvent.click(getByText('Sign in'));
    expect(getByText('This is mock login')).toBeInTheDocument();
  });
});
