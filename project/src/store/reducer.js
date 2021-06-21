import { ActionType } from './action';

const initState = {
  cityName: 'Paris',
  offers: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        cityName: action.payload,
      };
    default:
      return state;
  }
};
