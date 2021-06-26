export const ActionType = {
  LOAD_OFFERS: 'app/loadOffers',
  CHANGE_CITY: 'app/changeCity',
  SORT: 'app/sort',
  REDIRECT: 'app/redirect',
  GET_OFFER: 'data/getOffer',
  AUTHORIZE: 'user/authorize',
  LOGOUT: 'user/logout',
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
  authorize: (status) =>({
    type: ActionType.AUTHORIZE,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  redirect: (url) => ({
    type: ActionType.REDIRECT,
    payload: url,
  }),
};
