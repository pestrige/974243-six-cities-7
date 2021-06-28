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

export const checkAuth = () => (dispatch, getState, api) => {
  const token = getState().authInfo.userData?.token || '';

  return api.get(ApiRoute.LOGIN, {headers: {'x-token': token}})
    .then(({data}) => dispatch(ActionCreator.authorize({
      status: AuthorizationStatus.AUTH,
      userData: adaptUserDataToClient(data),
    })))
    .then(() => dispatch(ActionCreator.redirect(AppRoute.ROOT)))
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
    .then(() => dispatch(ActionCreator.redirect(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => dispatch(ActionCreator.unAuthorize()))
);

