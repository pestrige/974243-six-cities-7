import { AuthorizationStatus, StoreNameSpace, HttpCode, MAX_REVIEWS } from '../const';
import { sortOffers, createOffersMap } from '../utils/common';

export const getOffers = ({DATA, APP}) => sortOffers(DATA.offers, APP.city.name, APP.sortType.name);
export const getFavoriteOffers = ({DATA}) => DATA.offers.filter((offer) => offer.isFavorite);
export const getFavOffersMap = ({DATA}) => createOffersMap(DATA.offers);
export const getCurrentOffer = ({DATA}) => DATA.currentOffer;
export const getClosestOffers = ({DATA}) => DATA.closestOffers;
export const getIsOffersLoaded = ({DATA}) => DATA.isDataLoaded.offers;
export const getIsOfferLoaded = ({DATA}) => DATA.isDataLoaded.offer;
export const getIsClosestOffersLoaded = ({DATA}) => DATA.isDataLoaded.closestOffers;
export const getReviews = ({DATA}) => DATA.reviews.slice(0, MAX_REVIEWS);
export const getIsReviewsLoaded = ({DATA}) => DATA.isDataLoaded.reviews;

export const getActiveCity = ({APP}) => APP.city;
export const getCities = ({APP}) => APP.cities;
export const getSortType = ({APP}) => APP.sortType;

export const getCity = (state, action) => state.cities.find((city) => city.name === action.payload);
export const getIsAuth = ({AUTH}) => AUTH.status === AuthorizationStatus.AUTH;
export const getAuthInfo = ({AUTH}) => AUTH;

export const getIsSending = ({FORM}) => FORM.isSending;
export const getFormData = ({FORM}) => FORM.data;

export const getToastMessage = ({ERROR}) => ERROR.toast.message;
export const getIsToastShown = ({ERROR}) => ERROR.toast.isShown;
export const getIsError404 = ({ERROR}) => ERROR.error.status === HttpCode.NOT_FOUND;

export const getToken = (state) => state[StoreNameSpace.AUTH].userData?.token || '';
