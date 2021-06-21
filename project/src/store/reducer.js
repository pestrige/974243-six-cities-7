import { ActionType } from './action';
import { SortType, Cities } from '../const';

const initState = {
  cityName: Cities.PARIS.name,
  sortType: SortType.DEFAULT,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        cityName: action.payload,
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
