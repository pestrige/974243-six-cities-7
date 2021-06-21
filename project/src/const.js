export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer',
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
      zoom: 12,
    },
  },
  COLOGNE: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 12,
    },
  },
  BRUSSELS: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 12,
    },
  },
  AMSTERDAM: {
    name: 'Amsterdam',
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 12,
    },
  },
  HAMBURG: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 12,
    },
  },
  DUSSELDORF: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 12,
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
