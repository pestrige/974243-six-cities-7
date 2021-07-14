import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import Favorites from './favorites';

jest.mock('../../../store/api-action', () => ({
  __esModule: true,
  fetchFavorites() {
    return 'update offers via async action';
  },
}));
jest.mock('../../elements/header/header', () => ({
  __esModule: true,
  default() {
    return <div>This is mock Header</div>;
  },
}));
jest.mock('./empty', () => ({
  __esModule: true,
  default() {
    return <div>This is mock Empty component</div>;
  },
}));

const mockStore = configureStore();
const history = createMemoryHistory();

describe('component Favorites', () => {
  it('should render correcly with some offers', () => {
    const favoriteOffers = [
      {id: 1, isFavorite: true, city: {name: 'Paris'}},
      {id: 2, isFavorite: true, city: {name: 'Paris'}},
      {id: 3, isFavorite: true, city: {name: 'Paris'}},
    ];
    const storeFakeData = {
      DATA: {favoriteOffers, isDataLoaded: {favoriteOffers: true}},
      FORM: {isSending: false},
    };
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/This is mock Header/i)).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('page__main page__main--favorites', {exact: true});
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith('update offers via async action');
  });

  it('should render correcly with no offers', () => {
    const storeFakeData = {
      DATA: {favoriteOffers: [], isDataLoaded: {favoriteOffers: true}},
    };
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('main')).toHaveClass('page__main--favorites-empty page__main page__main--favorites', {exact: true});
    expect(screen.getByText(/This is mock Empty component/i)).toBeInTheDocument();
  });

  it('should redirect to / when clicked on the footer link', () => {
    const storeFakeData = {
      DATA: {favoriteOffers: [], isDataLoaded: {favoriteOffers: true}},
    };
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    history.push('/favorite');
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/favorite'}>
              <Favorites />
            </Route>
            <Route exact path={'/'}>
              <h1>This is the mock Main screen</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    const footerLink = screen.getByRole('link');
    expect(footerLink).toBeInTheDocument();
    expect(screen.queryByText('This is the mock Main screen')).not.toBeInTheDocument();
    userEvent.click(footerLink);
    expect(screen.getByText('This is the mock Main screen')).toBeInTheDocument();
  });
});
