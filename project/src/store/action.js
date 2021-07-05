export const ActionType = {
  CHANGE_CITY: 'app/changeCity',
  SORT: 'app/sort',
  SHOW_TOAST: 'app/showToast',
  HIDE_TOAST: 'app/hideToast',
  SET_FORM: 'app/setForm',
  LOAD_OFFERS: 'data/loadOffers',
  LOAD_OFFER: 'data/loadOffer',
  LOAD_REVIEWS: 'data/loadReviews',
  LOAD_CLOSEST_OFFERS: 'data/loadClosestOffers',
  CLEAR_OFFER_DATA: 'data/clearOfferData',
  CLEAR_FORM: 'data/clearForm',
  SET_SENDING_FLAG: 'data/setSendingFlag',
  ADD_ERROR: 'data/addError',
  CLEAR_ERROR: 'data/clearError',
  AUTHORIZE: 'user/authorize',
  UNAUTHORIZE: 'user/unAuthorize',
};

export const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  loadOffer: (offer) => ({
    type: ActionType.LOAD_OFFER,
    payload: offer,
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  loadClosestOffers: (offers) => ({
    type: ActionType.LOAD_CLOSEST_OFFERS,
    payload: offers,
  }),
  clearOfferData: () => ({
    type: ActionType.CLEAR_OFFER_DATA,
  }),
  changeCity: (cityName) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityName,
  }),
  sort: (sortType) => ({
    type: ActionType.SORT,
    payload: sortType,
  }),
  authorize: (authInfo) => ({
    type: ActionType.AUTHORIZE,
    payload: authInfo,
  }),
  unAuthorize: () => ({
    type: ActionType.UNAUTHORIZE,
  }),
  setSendingFlag: (value) => ({
    type: ActionType.SET_SENDING_FLAG,
    payload: value,
  }),
  setForm: (data) => ({
    type: ActionType.SET_FORM,
    payload: data,
  }),
  clearForm: () => ({
    type: ActionType.CLEAR_FORM,
  }),
  showToast: (message) => ({
    type: ActionType.SHOW_TOAST,
    payload: message,
  }),
  hideToast: () => ({
    type: ActionType.HIDE_TOAST,
  }),
  addError: (error) => ({
    type: ActionType.ADD_ERROR,
    payload: error,
  }),
  clearError: () => ({
    type: ActionType.CLEAR_ERROR,
  }),
};
