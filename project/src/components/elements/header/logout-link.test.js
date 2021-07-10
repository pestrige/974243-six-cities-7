import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import LogoutLink from './logout-link';

describe('component LogoutLink', () => {
  it('should render correctly', () => {
    const mockStore = configureStore();
    const storeFakeData = {AUTH: {status: 'AUTH'}};
    const history = createMemoryHistory();
    const { getByText } = render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <LogoutLink />
        </Router>
      </Provider>,
    );

    expect(getByText('Sign out')).toBeInTheDocument();
  });
});
