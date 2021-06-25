import { ActionCreator } from './action';
import { ApiRoute } from '../const';
import { adaptOffersToClient } from '../utils/adapters';

export const fetchOffers = () => (dispatch, _getState, api) => {
  api.get(ApiRoute.OFFERS)
    .then(({data}) => {
      const offers = adaptOffersToClient(data);
      dispatch(ActionCreator.loadOffers(offers));
    });
};
