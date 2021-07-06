import { createAction } from '@reduxjs/toolkit';

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

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => ({payload: offers}));
export const loadOffer = createAction(ActionType.LOAD_OFFER, (offer) => ({payload: offer}));
export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (reviews) => ({payload: reviews}));
export const loadClosestOffers = createAction(ActionType.LOAD_CLOSEST_OFFERS, (offers) => ({payload: offers}));
export const clearOfferData = createAction(ActionType.CLEAR_OFFER_DATA);

export const changeCity = createAction(ActionType.CHANGE_CITY, (cityName) => ({payload: cityName}));
export const sort = createAction(ActionType.SORT, (sortType) => ({payload: sortType}));

export const authorize = createAction(ActionType.AUTHORIZE, (authInfo) => ({payload: authInfo}));
export const unAuthorize = createAction(ActionType.UNAUTHORIZE);

export const setSendingFlag = createAction(ActionType.SET_SENDING_FLAG, (value) => ({payload: value}));
export const setForm = createAction(ActionType.SET_FORM, (data) => ({payload: data}));
export const clearForm = createAction(ActionType.CLEAR_FORM);

export const showToast = createAction(ActionType.SHOW_TOAST, (message) => ({payload: message}));
export const hideToast = createAction(ActionType.HIDE_TOAST);

export const addError = createAction(ActionType.ADD_ERROR, (error) => ({payload: error}));
export const clearError = createAction(ActionType.CLEAR_ERROR);
