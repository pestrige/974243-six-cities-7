import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import City from './city';

const mockStore = configureStore();
const storeFakeData = {
  APP: {
    city: {name: 'Paris'},
  },
};
const history = createMemoryHistory();

describe('Component City', () => {
  it('should render correctly with default values', () => {
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <City
            isActive={false}
            name={'Paris'}
            onChange={() => {}}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('locations__item-link tabs__item');
  });

  it('should render correctly with isActive flag', () => {
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <City
            isActive
            name={'Paris'}
            onChange={() => {}}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('link')).toHaveClass('tabs__item--active locations__item-link tabs__item');
  });

  it('should redirect to / when click to link', () => {
    const handleChange = jest.fn();
    history.push('/offer/1');
    const cityName = 'Paris';

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <City
            isActive={false}
            name={cityName}
            onChange={handleChange}
          />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('link'));
    expect(handleChange).toBeCalled();
    expect(handleChange).toHaveBeenCalledWith(cityName);
  });
});
