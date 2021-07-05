import { ActionCreator } from './action';
import { ApiRoute, AuthorizationStatus } from '../const';
import { adaptOffersToClient, adaptReviewsToClient, adaptUserDataToClient } from '../utils/adapters';

export const fetchOffers = () => (dispatch, _getState, api) => {
  api.get(ApiRoute.OFFERS)
    .then(({data}) => {
      const offers = adaptOffersToClient(data);
      dispatch(ActionCreator.loadOffers(offers));
    });
};

export const fetchOffer = (id) => (dispatch, _getState, api) => {
  api.get(`${ApiRoute.OFFERS}/${id}`)
    .then(({data}) => {
      const offer = adaptOffersToClient(data);
      dispatch(ActionCreator.loadOffer(offer));
    })
    .catch(({response}) => dispatch(ActionCreator.addError({
      status: response.status,
      text: response.statusText,
    })));
};

export const fetchReviews = (id) => (dispatch, getState, api) => {
  const token = getState().authInfo.userData?.token || '';
  api.get(`${ApiRoute.REVIEWS}/${id}`, {headers: {'X-Token': token}})
    .then(({data}) => {
      const reviews = adaptReviewsToClient(data);
      dispatch(ActionCreator.loadReviews(reviews));
    })
    .catch(({response}) => dispatch(ActionCreator.showToast(`Error ${response.status}: ${response.statusText}`)));
};

export const fetchClosestOffers = (id) => (dispatch, _getState, api) => {
  api.get(`${ApiRoute.OFFERS}/${id}/${ApiRoute.CLOSEST}`)
    .then(({data}) => {
      const offers = adaptOffersToClient(data);
      dispatch(ActionCreator.loadClosestOffers(offers));
    });
};

export const postReview = (id, comment) => (dispatch, getState, api) => {
  const token = getState().authInfo.userData?.token || '';
  api.post(`${ApiRoute.REVIEWS}/${id}`, comment, {headers: {'X-Token': token}})
    .then(({data}) => {
      const reviews = adaptReviewsToClient(data);
      dispatch(ActionCreator.setSendingFlag(false));
      dispatch(ActionCreator.clearForm());
      dispatch(ActionCreator.loadReviews(reviews));
    })
    .catch(({response}) => {
      dispatch(ActionCreator.setSendingFlag(false));
      dispatch(ActionCreator.showToast(`Error ${response.status}: ${response.statusText}`));
    });
};

export const checkAuth = () => (dispatch, getState, api) => {
  const token = getState().authInfo.userData?.token || '';

  return api.get(ApiRoute.LOGIN, {headers: {'X-Token': token}})
    .then(({data}) => dispatch(ActionCreator.authorize({
      status: AuthorizationStatus.AUTH,
      userData: adaptUserDataToClient(data),
    })))
    .catch(() => {});
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(ActionCreator.authorize({
        status: AuthorizationStatus.AUTH,
        userData: adaptUserDataToClient(data),
      }));
    })
    .catch(({response}) => dispatch(ActionCreator.showToast(`Error ${response.status}: ${response.statusText}`)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => dispatch(ActionCreator.unAuthorize()))
);

