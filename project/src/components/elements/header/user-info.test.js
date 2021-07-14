import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import UserInfo from './user-info';

describe('component UserInfo', () => {
  it('should render correctly', () => {
    const mockStore = configureStore();
    const storeFakeData = {AUTH: {status: 'AUTH'}};
    const history = createMemoryHistory();
    const fakeData = {email: 'test@test.com', avatarUrl: '/img/1.png'};

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <UserInfo userData={fakeData}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(fakeData.email)).toBeInTheDocument();
    expect(screen.getByTestId('userpick')).toHaveStyle(`background-image: url(${fakeData.avatarUrl})`);
  });

  it('should redirect to /favotires when click', () => {
    const mockStore = configureStore();
    const storeFakeData = {AUTH: {status: 'AUTH'}};
    const history = createMemoryHistory();
    const fakeData = {email: 'test@test.com', avatarUrl: '/img/1.png'};

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/favorites'}>
              <h1>This is mock favorites screen</h1>
            </Route>
            <Route>
              <UserInfo userData={fakeData}/>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('This is mock favorites screen')).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText('This is mock favorites screen')).toBeInTheDocument();
  });
});
