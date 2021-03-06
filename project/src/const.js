export const CLOSEST_OFFERS_COUNT = 3;
export const MAX_REVIEWS = 10;

export const StoreNameSpace = {
  DATA: 'DATA',
  APP: 'APP',
  AUTH: 'AUTH',
  ERROR: 'ERROR',
  FORM: 'FORM',
};

export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer',
  NOT_FOUND: '/404',
};

export const ApiRoute ={
  OFFERS: '/hotels',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REVIEWS: '/comments',
  CLOSEST: 'nearby',
  FAVORITE: '/favorite',
};

export const HttpCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const OfferType = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export const CardType = {
  DEFAULT: 'cities',
  CLOSEST: 'near-places',
  FAVORITE: 'favorites',
};

export const FavoriteButtonType = {
  DEFAULT: {
    name: 'place-card',
    width: 18,
    height: 19,
  },
  OFFER: {
    name: 'property',
    width: 31,
    height: 33,
  },
};

export const SortType = {
  DEFAULT: {
    name: 'default',
    text: 'Popular',
  },
  LOW_PRICE: {
    name: 'lowPrice',
    text: 'Price: low to high',
  },
  HIGHT_PRICE: {
    name: 'hightPrice',
    text: 'Price: high to low',
  },
  TOP_RATED: {
    name: 'topRated',
    text: 'Top rated first',
  },
};

export const Cities = {
  PARIS: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  COLOGNE: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  BRUSSELS: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  AMSTERDAM: {
    name: 'Amsterdam',
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 13,
    },
  },
  HAMBURG: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  DUSSELDORF: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
};

export const MapClass = {
  DEFAULT: 'cities',
  OFFER: 'property',
};

export const Marker = {
  SIZE: [27, 39],
  ANCHOR: [13, 39],
  URL: './img/pin.svg',
  ACTIVE_URL: './img/pin-active.svg',
};

export const Preloader = {
  SPEED: 2,
  SIZE: {
    Card: {
      WIDTH: 268,
      HEIGHT: 342,
    },
    Offer: {
      WIDTH: 790,
      HEIGHT: 700,
    },
    Reviews: {
      WIDTH: 613,
      HEIGHT: 130,
    },
  },

};
