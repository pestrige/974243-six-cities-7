import { ActionType } from './action';

const initState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85341,
      longitude: 2.3488,
      zoom: 13,
    },
  },
  offers: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: state.city,
      };
    default:
      return state;
  }
};
