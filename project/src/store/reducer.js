import { ActionType } from './action';
import { SortType, Cities, AuthorizationStatus } from '../const';
const cities = Object.values(Cities);

const initialState = {
  offers: [],
  currentOffer: {},
  reviews: [],
  closestOffers: [],
  city: Cities.PARIS,
  cities,
  sortType: SortType.DEFAULT,
  isDataLoaded: {
    offers: false,
    offer: false,
    reviews: false,
    closestOffers: false,
  },
  authInfo: {
    status: AuthorizationStatus.UNKNOWN,
    userData: {},
  },
  form: {
    isSending: false,
    data: {
      rating: null,
      comment: '',
    },
  },
  toast: {
    isShown: false,
    message: '',
  },
  error: {
    status: null,
    text: '',
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: {
          ...state.isDataLoaded,
          offers: true,
        },
      };
    case ActionType.LOAD_OFFER:
      return {
        ...state,
        currentOffer: action.payload,
        isDataLoaded: {
          ...state.isDataLoaded,
          offer: true,
        },
      };
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        isDataLoaded: {
          ...state.isDataLoaded,
          reviews: true,
        },
      };
    case ActionType.LOAD_CLOSEST_OFFERS:
      return {
        ...state,
        closestOffers: action.payload,
        isDataLoaded: {
          ...state.isDataLoaded,
          closestOffers: true,
        },
      };
    case ActionType.CLEAR_OFFER_DATA:
      return {
        ...state,
        currentOffer: {},
        reviews: [],
        closestOffers: [],
        isDataLoaded: {
          ...state.isDataLoaded,
          offer: false,
          reviews: false,
          closestOffers: false,
        },
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
        authInfo: action.payload,
      };
    case ActionType.UNAUTHORIZE:
      return {
        ...state,
        authInfo: {
          status: AuthorizationStatus.NO_AUTH,
          userData: {},
        },
      };
    case ActionType.SET_SENDING_FLAG:
      return {
        ...state,
        form: {
          ...state.form,
          isSending: action.payload,
        },
      };
    case ActionType.CLEAR_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          data: {
            rating: null,
            comment: '',
          },
        },
      };
    case ActionType.SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          data: action.payload,
        },
      };
    case ActionType.SHOW_TOAST:
      return {
        ...state,
        toast: {
          isShown: true,
          message: action.payload,
        },
      };
    case ActionType.HIDE_TOAST:
      return {
        ...state,
        toast: {
          isShown: false,
          message: '',
        },
      };
    case ActionType.ADD_ERROR:
      return {
        ...state,
        error: {
          status: action.payload.status,
          text: action.payload.text,
        },
      };
    case ActionType.CLEAR_ERROR:
      return {
        ...state,
        error: {
          status: null,
          text: '',
        },
      };
    default:
      return state;
  }
};
