import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import createMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import Reviews from './reviews';

jest.mock('../../../store/api-action', () => ({
  __esModule: true,
  fetchReviews() {
    return 'update reviews via async action';
  },
}));
jest.mock('./reviews-loading', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock ReviewsLoading</div>;
  },
}));
jest.mock('./reviews-list', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock ReviewsList</div>;
  },
}));
jest.mock('./form', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Form</div>;
  },
}));

const history = createMemoryHistory();
const mockStore = createMockStore();
let dispatch;
let useDispatch;

describe('Component Reviews', () => {
  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch = jest.spyOn(redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
  });

  it('should render correctly', () => {
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH'},
      DATA: {reviews: [], isDataLoaded: {reviews: true}},
    };
    const reviews = storeFakeData.DATA.reviews;
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Reviews id={1} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText(reviews.length)).toBeInTheDocument();
    expect(screen.getByText('This is the mock ReviewsList')).toBeInTheDocument();
    expect(screen.queryByText('This is the mock Form')).not.toBeInTheDocument();
    expect(screen.queryByText('This is the mock ReviewsLoading')).not.toBeInTheDocument();
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith('update reviews via async action');
  });

  it('should render correctly when user authorized', () => {
    const storeFakeData = {
      AUTH: {status: 'AUTH'},
      DATA: {reviews: [], isDataLoaded: {reviews: true}},
    };

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Reviews id={1} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is the mock Form')).toBeInTheDocument();
  });

  it('should render correctly when data is loading', () => {
    const storeFakeData = {
      AUTH: {status: 'AUTH'},
      DATA: {reviews: [], isDataLoaded: {reviews: false}},
    };

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Reviews id={1} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is the mock ReviewsLoading')).toBeInTheDocument();
    expect(screen.queryByText('Reviews ·')).not.toBeInTheDocument();
  });
});
