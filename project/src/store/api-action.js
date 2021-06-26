import { ActionCreator } from './action';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../const';
import { adaptOffersToClient } from '../utils/adapters';
import { setUserDataToStorage } from '../utils/common';

export const fetchOffers = () => (dispatch, _getState, api) => {
  api.get(ApiRoute.OFFERS)
    .then(({data}) => {
      const offers = adaptOffersToClient(data);
      dispatch(ActionCreator.loadOffers(offers));
    });
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(() => dispatch(ActionCreator.authorize(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => setUserDataToStorage(data))
    .then(() => dispatch(ActionCreator.authorize(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirect(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
);
