import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
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
});
