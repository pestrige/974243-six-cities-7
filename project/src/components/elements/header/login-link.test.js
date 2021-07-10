import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
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
});
