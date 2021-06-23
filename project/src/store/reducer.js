import { ActionType } from './action';
import { SortType, Cities } from '../const';
import { adaptOffersToClient, adaptReviewsToClient } from '../utils/adapters';
import { OFFERS } from '../mocks/offers';
import { REVIEWS } from '../mocks/reviews';

const adaptedOffers = adaptOffersToClient(OFFERS);
const adaptedReviews = adaptReviewsToClient(REVIEWS);
const cities = Object.values(Cities);

const initState = {
  offers: adaptedOffers,
  reviews: adaptedReviews,
  city: Cities.PARIS,
  cities,
  sortType: SortType.DEFAULT,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: state.cities.find((city) => city.name === action.payload),
        sortType: SortType.DEFAULT,
      };
    case ActionType.SORT:
      return {
        ...state,
        sortType: action.payload,
      };
    default:
      return state;
  }
};
