import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import createMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import Offer from './offer';

jest.mock('../../../store/api-action', () => ({
  __esModule: true,
  fetchOffer() {
    return 'update offer via async action';
  },
  fetchClosestOffers() {
    return 'update closestOffers via async action';
  },
}));
jest.mock('../../elements/header/header', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Header</div>;
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
jest.mock('./gallery', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Gallery</div>;
  },
}));
jest.mock('./good', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Good</div>;
  },
}));
jest.mock('./reviews', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Reviews</div>;
  },
}));
jest.mock('../../elements/favorite-button/favorite-button', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock FavoriteButton</div>;
  },
}));

const history = createMemoryHistory();
const mockStore = createMockStore();

describe('Component Offer', () => {
  it('should render correctly', () => {
    const storeFakeData = {
      DATA: {
        currentOffer: {
          title: 'test title',
          isPremium: true,
          bedrooms: 1,
          maxAdult: 2,
          price: 100,
          description: 'test description',
          goods: [],
          host: {isPro: false, avatarUrl: 'url'}},
        closestOffers: [],
        isDataLoaded: {offer: true, closestOffers: true},
      },
      FORM: {isSending: false, data: {rating: null, comment: ''}},
      ERROR: {error: {status: null}},
    };
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    global.scrollTo = jest.fn();

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Offer id={1} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is the mock Header')).toBeInTheDocument();
    expect(screen.getByText('This is the mock Offers')).toBeInTheDocument();
    expect(screen.getByText('This is the mock Map')).toBeInTheDocument();
    expect(screen.getByText('This is the mock Reviews')).toBeInTheDocument();
    expect(screen.getByText('This is the mock FavoriteButton')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('test title')).toBeInTheDocument();
    expect(screen.getByText('1 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 2 adults')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getByText('test description')).toBeInTheDocument();

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenNthCalledWith(1, 'update offer via async action');
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'data/clearOfferData',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenNthCalledWith(3, 'update closestOffers via async action');
  });
});
