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

export const Cities = {
  AMSTERDAM: {
    name: 'Amsterdam',
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 13,
    },
  },
  PARIS: {
    name: 'Paris',
    location: {
      latitude: 48.85341,
      longitude: 2.3488,
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
