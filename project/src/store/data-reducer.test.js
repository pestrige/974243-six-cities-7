import { dataReducer } from './data-reducer';
import { ActionType } from './action';

describe('Data Reducer', () => {
  it('should return the initial state by default', () => {
    const initialState = {
      offers: [],
      currentOffer: {},
      reviews: [],
      closestOffers: [],
      favoriteOffers: [],
      isDataLoaded: {
        offers: false,
        offer: false,
        reviews: false,
        closestOffers: false,
        favoriteOffers: false,
      },
    };

    expect(dataReducer(undefined, {})).toEqual(initialState);
  });

  it('should update offers by load offers', () => {
    const state = {
      offers: [],
      isDataLoaded: {offers: false},
    };
    const offers = [{}, {}];
    const loadOffersAction = {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
    const expectedState = {
      offers: offers,
      isDataLoaded: {offers: true},
    };

    expect(dataReducer(state, loadOffersAction)).toEqual(expectedState);
  });

  it('should update current offer by load offer', () => {
    const state = {
      currentOffer: {},
      isDataLoaded: {offer: false},
    };
    const currentOffer = {description: 'someUpdatedInfo'};
    const loadOfferAction = {
      type: ActionType.LOAD_OFFER,
      payload: currentOffer,
    };
    const expectedState = {
      currentOffer,
      isDataLoaded: {offer: true},
    };

    expect(dataReducer(state, loadOfferAction)).toEqual(expectedState);
  });

  it('should update reviews by load reviews', () => {
    const state = {
      reviews: [],
      isDataLoaded: {reviews: false},
    };
    const reviews = [{}, {}];
    const loadReviewsAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
    const expectedState = {
      reviews,
      isDataLoaded: {reviews: true},
    };

    expect(dataReducer(state, loadReviewsAction)).toEqual(expectedState);
  });

  it('should update nearby offers by load nearby offers', () => {
    const state = {
      closestOffers: [],
      isDataLoaded: {closestOffers: false},
    };
    const closestOffers = [{}, {}];
    const loadClosestOffersAction = {
      type: ActionType.LOAD_CLOSEST_OFFERS,
      payload: closestOffers,
    };
    const expectedState = {
      closestOffers,
      isDataLoaded: {closestOffers: true},
    };

    expect(dataReducer(state, loadClosestOffersAction)).toEqual(expectedState);
  });

  it('should update favorite offers by load favorite offers', () => {
    const state = {
      favoriteOffers: [],
      isDataLoaded: {favoriteOffers: false},
    };
    const favoriteOffers = [{}, {}];
    const loadFavoriteOffersAction = {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: favoriteOffers,
    };
    const expectedState = {
      favoriteOffers,
      isDataLoaded: {favoriteOffers: true},
    };

    expect(dataReducer(state, loadFavoriteOffersAction)).toEqual(expectedState);
  });

  it('should update offers and favorite offers by update offer', () => {
    const state = {
      offers: [
        {id: 1, isFavorite: false},
        {id: 2, isFavorite: true},
        {id: 3, isFavorite: false},
        {id: 4, isFavorite: true},
      ],
      favoriteOffers: [
        {id: 2, isFavorite: true},
        {id: 4, isFavorite: true},
      ],
    };
    const updatedOffer = {id: 1, isFavorite: true};
    const updateOffersAction = {
      type: ActionType.UPDATE_OFFERS,
      payload: updatedOffer,
    };
    const expectedState = {
      offers: [
        {id: 1, isFavorite: true},
        {id: 2, isFavorite: true},
        {id: 3, isFavorite: false},
        {id: 4, isFavorite: true},
      ],
      favoriteOffers: [
        {id: 1, isFavorite: true},
        {id: 2, isFavorite: true},
        {id: 4, isFavorite: true},
      ],
    };

    expect(dataReducer(state, updateOffersAction)).toEqual(expectedState);
  });
  it('should erase offer data by clear offer', () => {
    const state = {
      currentOffer: ['some current offer data'],
      reviews: ['some reviews data'],
      closestOffers: ['some nearby offers data'],
      isDataLoaded: {offer: true, reviews: true, closestOffers: true},
    };
    const clearOfferDataAction = {
      type: ActionType.CLEAR_OFFER_DATA,
    };
    const expectedState = {
      currentOffer: [],
      reviews: [],
      closestOffers: [],
      isDataLoaded: {offer: false, reviews: false, closestOffers: false},
    };

    expect(dataReducer(state, clearOfferDataAction)).toEqual(expectedState);
  });
});

