import React from 'react';
import { render } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import LogoutLink from './logout-link';
import userEvent from '@testing-library/user-event';

jest.mock('../../../store/api-action', () => ({
  __esModule: true,
  logout() {
    return 'updated store data after async actions';
  },
}));

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

  it('should redirect to / when click', () => {
    const mockStore = configureStore();
    const storeFakeData = {AUTH: {status: 'AUTH'}};
    const history = createMemoryHistory();
    history.push('/favorites');
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const { getByText } = render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/'}>
              <h1>This is mock main screen</h1>
            </Route>
            <Route exact path={'/favorites'}>
              <LogoutLink />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    userEvent.click(getByText('Sign out'));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith('updated store data after async actions');
    expect(getByText('This is mock main screen')).toBeInTheDocument();
  });
});
