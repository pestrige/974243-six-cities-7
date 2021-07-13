import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from './not-found';

jest.mock('../../elements/header/header', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Header</div>;
  },
}));

const history = createMemoryHistory();
const mockStore = createMockStore();

describe('component NotFound', () => {
  it('should render correctly', () => {
    history.push('/404');

    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/404'}>
              <NotFound />
            </Route>
            <Route>
              <div>This is the mock Main</div>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Page not found');
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, the page you were looking for could not be found.')).toBeInTheDocument();
    expect(screen.getByText('Home page')).toBeInTheDocument();

    expect(screen.queryByText('This is the mock Main')).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText('This is the mock Main')).toBeInTheDocument();
  });
});
