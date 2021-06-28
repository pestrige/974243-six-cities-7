import { ActionCreator } from './action';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../const';
import { adaptOffersToClient, adaptUserDataToClient } from '../utils/adapters';

export const fetchOffers = () => (dispatch, _getState, api) => {
  api.get(ApiRoute.OFFERS)
    .then(({data}) => {
      const offers = adaptOffersToClient(data);
      dispatch(ActionCreator.loadOffers(offers));
    });
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(({data}) => dispatch(ActionCreator.authorize({
      status: AuthorizationStatus.AUTH,
      userData: adaptUserDataToClient(data),
    })))
    .then(() => dispatch(ActionCreator.redirect(AppRoute.ROOT)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      dispatch(ActionCreator.authorize({
        status: AuthorizationStatus.AUTH,
        userData: adaptUserDataToClient(data),
      }));
    })
    .then(() => dispatch(ActionCreator.redirect(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.unAuthorize()))
);

