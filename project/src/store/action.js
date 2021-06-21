export const ActionType = {
  CHANGE_CITY: 'changeCity',
  SET_OFFERS: 'setOffers',
};

export const ActionCreator = {
  changeCity: (cityName) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityName,
  }),
};
