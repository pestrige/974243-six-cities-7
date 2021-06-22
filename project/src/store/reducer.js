import { ActionType } from './action';
import { SortType, Cities } from '../const';
import { adaptOffersToClient, adaptReviewsToClient } from '../utils/adapters';
import { Sorting } from '../utils/common';
import { OFFERS } from '../mocks/offers';
import { REVIEWS } from '../mocks/reviews';

const adaptedOffers = adaptOffersToClient(OFFERS);
const adaptedReviews = adaptReviewsToClient(REVIEWS);
const defaultSortedOffers = Sorting[SortType.DEFAULT.name](adaptedOffers, Cities.PARIS.name);

const initState = {
  offers: adaptedOffers,
  reviews: adaptedReviews,
  city: Cities.PARIS,
  sortType: SortType.DEFAULT,
  sortedOffers: defaultSortedOffers,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: Object.values(Cities).find((city) => city.name === action.payload),
        sortType: SortType.DEFAULT,
        sortedOffers: Sorting[state.sortType.name](state.offers, action.payload),
      };
    case ActionType.SORT:
      return {
        ...state,
        sortType: action.payload,
        sortedOffers: Sorting[action.payload.name](state.offers, state.cityName),
      };
    default:
      return state;
  }
};
