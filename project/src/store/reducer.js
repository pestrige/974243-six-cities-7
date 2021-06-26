import { ActionType } from './action';
import { SortType, Cities, AuthorizationStatus } from '../const';
import { adaptReviewsToClient } from '../utils/adapters';
import { REVIEWS } from '../mocks/reviews';

const adaptedReviews = adaptReviewsToClient(REVIEWS);
const cities = Object.values(Cities);

const initialState = {
  offers: [],
  reviews: adaptedReviews,
  city: Cities.PARIS,
  cities,
  sortType: SortType.DEFAULT,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
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
    case ActionType.AUTHORIZE:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
};
