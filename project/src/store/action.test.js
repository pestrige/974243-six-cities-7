import {
  loadOffers,
  loadOffer,
  loadReviews,
  loadClosestOffers,
  loadFavoriteOffers,
  updateOffers,
  clearOfferData,
  changeCity,
  sort,
  authorize,
  unAuthorize,
  setSendingFlag,
  setForm,
  clearForm,
  showToast,
  hideToast,
  addError,
  clearError,
  ActionType
} from './action';

describe('Actions', () => {
  it('action creator for load offers returns correct action', () => {
    const offers = [{},{}];
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
    expect(loadOffers(offers)).toEqual(expectedAction);
  });

  it('action creator for load offer returns correct action', () => {
    const offer = {};
    const expectedAction = {
      type: ActionType.LOAD_OFFER,
      payload: offer,
    };
    expect(loadOffer(offer)).toEqual(expectedAction);
  });

  it('action creator for load reviews returns correct action', () => {
    const reviews = [{}, {}];
    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
    expect(loadReviews(reviews)).toEqual(expectedAction);
  });

  it('action creator for load nearby offers returns correct action', () => {
    const closestOffers = [{}, {}];
    const expectedAction = {
      type: ActionType.LOAD_CLOSEST_OFFERS,
      payload: closestOffers,
    };
    expect(loadClosestOffers(closestOffers)).toEqual(expectedAction);
  });

  it('action creator for load favorites offers returns correct action', () => {
    const favoriteOffers = [{}, {}];
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: favoriteOffers,
    };
    expect(loadFavoriteOffers(favoriteOffers)).toEqual(expectedAction);
  });

  it('action creator for update offers returns correct action', () => {
    const updatedOffers = {};
    const expectedAction = {
      type: ActionType.UPDATE_OFFERS,
      payload: updatedOffers,
    };
    expect(updateOffers(updatedOffers)).toEqual(expectedAction);
  });

  it('action creator for clear offers data returns correct action', () => {
    const expectedAction = {
      type: ActionType.CLEAR_OFFER_DATA,
    };
    expect(clearOfferData()).toEqual(expectedAction);
  });

  it('action creator for change city name returns correct action', () => {
    const city = 'Paris';
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };
    expect(changeCity(city)).toEqual(expectedAction);
  });

  it('action creator for sort offers returns correct action', () => {
    const sortType = {name: '', text: ''};
    const expectedAction = {
      type: ActionType.SORT,
      payload: sortType,
    };
    expect(sort(sortType)).toEqual(expectedAction);
  });

  it('action creator for authorize returns correct action', () => {
    const authInfo = {status: '', userData: {}};
    const expectedAction = {
      type: ActionType.AUTHORIZE,
      payload: authInfo,
    };
    expect(authorize(authInfo)).toEqual(expectedAction);
  });

  it('action creator for unauthorize returns correct action', () => {
    const expectedAction = {
      type: ActionType.UNAUTHORIZE,
    };
    expect(unAuthorize()).toEqual(expectedAction);
  });

  it('action creator for set sending flag returns correct action', () => {
    const isSending = true;
    const expectedAction = {
      type: ActionType.SET_SENDING_FLAG,
      payload: isSending,
    };
    expect(setSendingFlag(isSending)).toEqual(expectedAction);
  });

  it('action creator for set form data returns correct action', () => {
    const formData = {comment: '', rating: 1};
    const expectedAction = {
      type: ActionType.SET_FORM,
      payload: formData,
    };
    expect(setForm(formData)).toEqual(expectedAction);
  });

  it('action creator for clear form returns correct action', () => {
    const expectedAction = {
      type: ActionType.CLEAR_FORM,
    };
    expect(clearForm()).toEqual(expectedAction);
  });

  it('action creator for show toast returns correct action', () => {
    const message = '';
    const expectedAction = {
      type: ActionType.SHOW_TOAST,
      payload: message,
    };
    expect(showToast(message)).toEqual(expectedAction);
  });

  it('action creator for hide toast returns correct action', () => {
    const expectedAction = {
      type: ActionType.HIDE_TOAST,
    };
    expect(hideToast()).toEqual(expectedAction);
  });

  it('action creator for add error returns correct action', () => {
    const error = {status: '', text: ''};
    const expectedAction = {
      type: ActionType.ADD_ERROR,
      payload: error,
    };
    expect(addError(error)).toEqual(expectedAction);
  });

  it('action creator for clear error returns correct action', () => {
    const expectedAction = {
      type: ActionType.CLEAR_ERROR,
    };
    expect(clearError()).toEqual(expectedAction);
  });
});
