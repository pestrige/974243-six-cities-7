import {
  loadOffers,
  loadOffer,
  loadReviews,
  loadClosestOffers,
  loadFavoriteOffers,
  updateOffers,
  showToast,
  addError,
  setSendingFlag,
  clearForm,
  authorize,
  unAuthorize
} from './action';
import { getToken } from '../store/selectors';
import { ApiRoute, AuthorizationStatus } from '../const';
import { adaptOffersToClient, adaptReviewsToClient, adaptUserDataToClient } from '../utils/adapters';

export const fetchOffers = () => (dispatch, getState, api) => (
  api.get(ApiRoute.OFFERS, {headers: {'X-Token': getToken(getState())}})
    .then(({data}) => {
      const offers = adaptOffersToClient(data);
      dispatch(loadOffers(offers));
    })
);

export const fetchOffer = (id) => (dispatch, getState, api) => (
  api.get(`${ApiRoute.OFFERS}/${id}`, {headers: {'X-Token': getToken(getState())}})
    .then(({data}) => {
      const offer = adaptOffersToClient(data);
      dispatch(loadOffer(offer));
    })
    .catch(({response}) => dispatch(addError({
      status: response.status,
      text: response.statusText,
    })))
);

export const fetchReviews = (id) => (dispatch, getState, api) => (
  api.get(`${ApiRoute.REVIEWS}/${id}`, {headers: {'X-Token': getToken(getState())}})
    .then(({data}) => {
      const reviews = adaptReviewsToClient(data);
      dispatch(loadReviews(reviews));
    })
    .catch(({response}) => dispatch(showToast(`Error ${response.status}: ${response.statusText}`)))
);

export const fetchClosestOffers = (id) => (dispatch, getState, api) => (
  api.get(`${ApiRoute.OFFERS}/${id}/${ApiRoute.CLOSEST}`, {headers: {'X-Token': getToken(getState())}})
    .then(({data}) => {
      const offers = adaptOffersToClient(data);
      dispatch(loadClosestOffers(offers));
    })
);

export const fetchFavorites = () => (dispatch, getState, api) => (
  api.get(ApiRoute.FAVORITE, {headers: {'X-Token': getToken(getState())}})
    .then(({data}) => {
      const offers = adaptOffersToClient(data);
      dispatch(loadFavoriteOffers(offers));
    })
);

export const postReview = (id, comment) => (dispatch, getState, api) => (
  api.post(`${ApiRoute.REVIEWS}/${id}`, comment, {headers: {'X-Token': getToken(getState())}})
    .then(({data}) => {
      const reviews = adaptReviewsToClient(data);
      dispatch(setSendingFlag(false));
      dispatch(clearForm());
      dispatch(loadReviews(reviews));
    })
    .catch(({response}) => {
      dispatch(setSendingFlag(false));
      dispatch(showToast(`Error ${response.status}: ${response.statusText}`));
    })
);

export const switchFavorite = (id, isFavorite, isNeedToUpdateOffer) => (dispatch, getState, api) => (
  api.post(`${ApiRoute.FAVORITE}/${id}/${+!isFavorite}`, {}, {headers: {'X-Token': getToken(getState())}})
    .then(({data}) => {
      const offer = adaptOffersToClient(data);
      dispatch(setSendingFlag(false));
      if (isNeedToUpdateOffer) {
        dispatch(loadOffer(offer));
      }
      dispatch(updateOffers(offer));
    })
    .catch(({response}) => {
      dispatch(setSendingFlag(false));
      dispatch(showToast(`Error ${response.status}: ${response.statusText}`));
    })
);

export const checkAuth = () => (dispatch, getState, api) => {
  const token = getToken(getState());

  return api.get(ApiRoute.LOGIN, {headers: {'X-Token': token}})
    .then(({data}) => dispatch(authorize({
      status: AuthorizationStatus.AUTH,
      userData: adaptUserDataToClient(data),
    })))
    .catch(() => {});
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(authorize({
        status: AuthorizationStatus.AUTH,
        userData: adaptUserDataToClient(data),
      }));
      dispatch(fetchOffers()); // повторно загружаем офферы для залогиненного пользователя
    })
    .catch(({response}) => dispatch(showToast(`Error ${response.status}: ${response.statusText}`)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => {
      dispatch(unAuthorize());
      dispatch(fetchOffers()); // обновляем офферы
    })
);

