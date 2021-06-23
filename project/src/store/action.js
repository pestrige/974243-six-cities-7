export const ActionType = {
  CHANGE_CITY: 'changeCity',
  SORT: 'sort',
  GET_OFFER: 'getOffer',
};

export const ActionCreator = {
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
