import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from './not-found';

const history = createMemoryHistory();
const mockStore = createMockStore();
const storeFakeData = {
  AUTH: {status: 'NO_AUTH'},
  ERROR: {toast: {isShown: 'false'}},
};

describe('component NotFound', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <NotFound />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Page not found');
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, the page you were looking for could not be found.')).toBeInTheDocument();
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
