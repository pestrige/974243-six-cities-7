import { ActionType } from './action';
import { SortType, Cities } from '../const';
import { adaptReviewsToClient } from '../utils/adapters';
//import { OFFERS } from '../mocks/offers';
import { REVIEWS } from '../mocks/reviews';

//const adaptedOffers = adaptOffersToClient(OFFERS);
const adaptedReviews = adaptReviewsToClient(REVIEWS);
const cities = Object.values(Cities);

const initialState = {
  offers: [],
  reviews: adaptedReviews,
  city: Cities.PARIS,
  cities,
  sortType: SortType.DEFAULT,
  isDataLoaded: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
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
