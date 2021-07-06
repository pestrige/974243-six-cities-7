import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, loadOffer, loadReviews, loadClosestOffers, clearOfferData } from './action';

const initialState = {
  offers: [],
  currentOffer: {},
  reviews: [],
  closestOffers: [],
  isDataLoaded: {
    offers: false,
    offer: false,
    reviews: false,
    closestOffers: false,
  },
};

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded.offers = true;
    })
    .addCase(loadOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.isDataLoaded.offer = true;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
      state.isDataLoaded.reviews = true;
    })
    .addCase(loadClosestOffers, (state, action) => {
      state.closestOffers = action.payload;
      state.isDataLoaded.closestOffers = true;
    })
    .addCase(clearOfferData, (state) => {
      state.currentOffer = [];
      state.reviews = [];
      state.closestOffers = [];
      state.isDataLoaded.offer = false;
      state.isDataLoaded.reviews = false;
      state.isDataLoaded.closestOffers = false;
    });
});
