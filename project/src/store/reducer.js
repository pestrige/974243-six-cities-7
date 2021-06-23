import { ActionType } from './action';
import { SortType, Cities } from '../const';
import { adaptOffersToClient, adaptReviewsToClient } from '../utils/adapters';
//import { sortOffers } from '../utils/common';
import { OFFERS } from '../mocks/offers';
import { REVIEWS } from '../mocks/reviews';

const adaptedOffers = adaptOffersToClient(OFFERS);
const adaptedReviews = adaptReviewsToClient(REVIEWS);
//const defaultSortedOffers = sortOffers(adaptedOffers, Cities.PARIS.name);
const citiesList = Object.values(Cities);

const initState = {
  offers: adaptedOffers,
  reviews: adaptedReviews,
  city: Cities.PARIS,
  citiesList,
  sortType: SortType.DEFAULT,
  //sortedOffers: defaultSortedOffers,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: state.citiesList.find((city) => city.name === action.payload),
        sortType: SortType.DEFAULT,
        //sortedOffers: sortOffers(state.offers, action.payload, state.sortType.name),
      };
    case ActionType.SORT:
      return {
        ...state,
        sortType: action.payload,
        //sortedOffers: sortOffers(state.offers, state.city.name, action.payload.name),
      };
    default:
      return state;
  }
};
