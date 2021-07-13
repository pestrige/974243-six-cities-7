import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import Main from './main';

jest.mock('../../elements/header/header', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Header</div>;
  },
}));
jest.mock('../../elements/cities/cities', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Cities</div>;
  },
}));
jest.mock('../../elements/offers/offers', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Offers</div>;
  },
}));
jest.mock('../../elements/map/map', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Map</div>;
  },
}));
jest.mock('../../elements/sort/sort', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Sort</div>;
  },
}));

const history = createMemoryHistory();
const mockStore = configureStore();
const offers = [
  {id: 1, city: {name: 'Paris'}},
  {id: 2, city: {name: 'Paris'}},
  {id: 3, city: {name: 'Paris'}},
];
const sortType = {name: 'default', text: 'Popular'};
const storeFakeData = {
  DATA: {offers, isDataLoaded: {offers: true}},
  APP: {city: {name: 'Paris'}, sortType},
};

describe('Component Main', () => {
  it('should render correctly with default values', () => {
    const {APP, DATA} = storeFakeData;

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is the mock Header')).toBeInTheDocument();
    expect(screen.getByText('This is the mock Cities')).toBeInTheDocument();
    expect(screen.getByText('This is the mock Sort')).toBeInTheDocument();
    expect(screen.getByText('This is the mock Offers')).toBeInTheDocument();
    expect(screen.getByText('This is the mock Map')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByTestId('main-page')).toHaveClass('page page--gray page--main', {exact: true});
    expect(screen.getByTestId('places-container')).toHaveClass('cities__places-container container', {exact: true});
    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText(`${DATA.offers.length} places to stay in ${APP.city.name}`)).toBeInTheDocument();
  });

  it('should render correctly with no offers', () => {
    const fakeDataWithNoOffers = {
      ...storeFakeData,
      DATA: {...storeFakeData.DATA, offers: []},
    };

    render(
      <Provider store={mockStore(fakeDataWithNoOffers)}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('main-page')).toHaveClass('page page--gray page--main page__main--index-empty', {exact: true});
    expect(screen.getByTestId('places-container')).toHaveClass('cities__places-container container cities__places-container--empty', {exact: true});
    expect(screen.getByTestId('cities-empty-container')).toBeInTheDocument();
  });

  it('should render correctly while data is loading', () => {
    const fakeDataWithLoading = {
      ...storeFakeData,
      DATA: {...storeFakeData.DATA, isDataLoaded: {offers: false}},
    };

    render(
      <Provider store={mockStore(fakeDataWithLoading)}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Places are loading ...')).toBeInTheDocument();
  });

  it('should call dispatch with correct action and payload', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: 'app/sort',
      payload: {
        name: 'default',
        text: 'Popular',
      },
    });
  });
});
