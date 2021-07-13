import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import City from './city';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore();
const history = createMemoryHistory();

describe('component City', () => {
  it('should render correctly', () => {
    const cityName = 'Paris';
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH'},
      DATA: {isDataLoaded: {offers: true}},
      FORM: {isSending: false},
    };
    const offers = [
      {id: 1, isFavorite: false},
      {id: 2, isFavorite: false},
      {id: 3, isFavorite: false},
    ];

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <City
            cityName={cityName}
            offers={offers}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(cityName)).toBeInTheDocument();
    const cardsCount = screen.getAllByRole('article').length;
    expect(cardsCount === offers.length).toBeTruthy();
  });

  it('should redirect to / when click on the city link', () => {
    const cityName = 'Paris';
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH'},
      DATA: {isDataLoaded: {offers: true}},
      FORM: {isSending: false},
    };
    const offers = [
      {id: 1, isFavorite: false},
      {id: 2, isFavorite: false},
      {id: 3, isFavorite: false},
    ];

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push('/favorites');
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/favorites'}>
              <City
                cityName={cityName}
                offers={offers}
              />
            </Route>
            <Route path={'/'}>
              <h1>This is the mock Main screen</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('This is the mock Main screen')).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('favotire-city-link'));
    expect(screen.getByText('This is the mock Main screen')).toBeInTheDocument();
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      payload: 'Paris',
      type: 'app/changeCity',
    });
  });
});
