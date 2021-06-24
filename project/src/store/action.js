export const ActionType = {
  LOAD_OFFERS: 'loadOffers',
  CHANGE_CITY: 'changeCity',
  SORT: 'sort',
  GET_OFFER: 'getOffer',
};

export const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  changeCity: (cityName) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityName,
  }),
  sort: (sortType) => ({
    type: ActionType.SORT,
    payload: sortType,
  }),
  getOffer: (id) => ({
    type: ActionType.GET_OFFER,
    payload: id,
  }),
};
