import MockAdapter  from 'axios-mock-adapter';
import { createApi } from '../services/api';
import { ActionType } from './action';
import { ApiRoute, AuthorizationStatus } from '../const';
import {
  checkAuth,
  login,
  logout,
  fetchOffers,
  fetchOffer,
  fetchReviews,
  fetchClosestOffers,
  fetchFavorites,
  postReview,
  switchFavorite
} from './api-action';

let api = null;
let mockApi = null;
let dispatch = null;
const token = 'fake token';
const fakeData = {fake: true};
const getState = () => ({AUTH: {userData: {token}}});

describe('Async actions', () => {
  beforeAll(() => {
    api = createApi(() => {});
  });
  beforeEach(() => {
    mockApi = new MockAdapter(api);
    dispatch = jest.fn();
  });

  it('should make a correct API call to GET /login', () => {
    const checkAuthLoader = checkAuth();

    mockApi.onGet(ApiRoute.LOGIN).reply(200, fakeData);

    return checkAuthLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.AUTHORIZE,
          payload: {
            status: AuthorizationStatus.AUTH,
            userData: fakeData,
          },
        });
      });
  });

  it('should make a correct API call to POST /login', () => {
    const fakeUser = {login: 'fake@test.com', password: '12345'};
    const loginLoader = login(fakeUser);

    mockApi.onPost(ApiRoute.LOGIN).reply(200, fakeData);

    return loginLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.AUTHORIZE,
          payload: {
            status: AuthorizationStatus.AUTH,
            userData: fakeData,
          },
        });
      });
  });

  it('should make a correct API call to GET /logout', () => {
    const logoutLoader = logout();

    mockApi.onDelete(ApiRoute.LOGOUT).reply(204);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UNAUTHORIZE,
        });
      });
  });

  it('should make a correct API call to GET /hotels', () => {
    const offersLoader = fetchOffers();

    mockApi.onGet(ApiRoute.OFFERS).reply(200, fakeData);

    return offersLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: fakeData,
        });
      });
  });

  it('should make a correct API call to GET /hotels/:id', () => {
    const fakeID = 1;
    const offerLoader = fetchOffer(fakeID);

    mockApi.onGet(`${ApiRoute.OFFERS}/${fakeID}`).reply(200, fakeData);

    return offerLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER,
          payload: fakeData,
        });
      });
  });

  it('should make a correct API call to GET /comments/:hotel_id', () => {
    const fakeID = 1;
    const reviewsLoader = fetchReviews(fakeID);

    mockApi.onGet(`${ApiRoute.REVIEWS}/${fakeID}`).reply(200, fakeData);

    return reviewsLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: fakeData,
        });
      });
  });

  it('should make a correct API call to GET /hotels/:id/nearby', () => {
    const fakeID = 1;
    const closestOffersLoader = fetchClosestOffers(fakeID);

    mockApi.onGet(`${ApiRoute.OFFERS}/${fakeID}/${ApiRoute.CLOSEST}`).reply(200, fakeData);

    return closestOffersLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_CLOSEST_OFFERS,
          payload: fakeData,
        });
      });
  });

  it('should make a correct API call to GET /favorite', () => {
    const favoriteOffersLoader = fetchFavorites();

    mockApi.onGet(ApiRoute.FAVORITE).reply(200, fakeData);

    return favoriteOffersLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE_OFFERS,
          payload: fakeData,
        });
      });
  });

  it('should make a correct API call to POST /comments/:hotel_id', () => {
    const fakeID = 1;
    const fakeComment = {comment: '', rating: 1};
    const reviewPublisher = postReview(fakeID, fakeComment);

    mockApi.onPost(`${ApiRoute.REVIEWS}/${fakeID}`).reply(200, fakeData);

    return reviewPublisher(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_SENDING_FLAG,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CLEAR_FORM,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.LOAD_REVIEWS,
          payload: fakeData,
        });
      });
  });

  it('should make a correct API call to POST /favorite/:hotel_id/:status', () => {
    const fakeID = 1;
    const switchFavoriteLoader = switchFavorite(fakeID, true, true);

    mockApi.onPost(`${ApiRoute.FAVORITE}/${fakeID}/1`).reply(200, []);

    return switchFavoriteLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_SENDING_FLAG,
          payload: false,
        });
      });
  });
});
