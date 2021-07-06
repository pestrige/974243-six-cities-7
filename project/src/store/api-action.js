import {
  loadOffers,
  loadOffer,
  loadReviews,
  loadClosestOffers,
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

export const fetchOffers = () => (dispatch, _getState, api) => {
  api.get(ApiRoute.OFFERS)
    .then(({data}) => {
      const offers = adaptOffersToClient(data);
      dispatch(loadOffers(offers));
    });
};

export const fetchOffer = (id) => (dispatch, _getState, api) => {
  api.get(`${ApiRoute.OFFERS}/${id}`)
    .then(({data}) => {
      const offer = adaptOffersToClient(data);
      dispatch(loadOffer(offer));
    })
    .catch(({response}) => dispatch(addError({
      status: response.status,
      text: response.statusText,
    })));
};

export const fetchReviews = (id) => (dispatch, getState, api) => {
  const token = getToken(getState());
  api.get(`${ApiRoute.REVIEWS}/${id}`, {headers: {'X-Token': token}})
    .then(({data}) => {
      const reviews = adaptReviewsToClient(data);
      dispatch(loadReviews(reviews));
    })
    .catch(({response}) => dispatch(showToast(`Error ${response.status}: ${response.statusText}`)));
};

export const fetchClosestOffers = (id) => (dispatch, _getState, api) => {
  api.get(`${ApiRoute.OFFERS}/${id}/${ApiRoute.CLOSEST}`)
    .then(({data}) => {
      const offers = adaptOffersToClient(data);
      dispatch(loadClosestOffers(offers));
    });
};

export const postReview = (id, comment) => (dispatch, getState, api) => {
  const token = getToken(getState());
  api.post(`${ApiRoute.REVIEWS}/${id}`, comment, {headers: {'X-Token': token}})
    .then(({data}) => {
      const reviews = adaptReviewsToClient(data);
      dispatch(setSendingFlag(false));
      dispatch(clearForm());
      dispatch(loadReviews(reviews));
    })
    .catch(({response}) => {
      dispatch(setSendingFlag(false));
      dispatch(showToast(`Error ${response.status}: ${response.statusText}`));
    });
};

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
    })
    .catch(({response}) => dispatch(showToast(`Error ${response.status}: ${response.statusText}`)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => dispatch(unAuthorize()))
);

