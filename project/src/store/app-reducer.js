import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sort } from './action';
import { getCity } from './selectors';
import { SortType, Cities } from '../const';
const cities = Object.values(Cities);

const initialState = {
  city: Cities.PARIS,
  cities,
  sortType: SortType.DEFAULT,
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = getCity(state, action);
      state.sortType =  SortType.DEFAULT;
    })
    .addCase(sort, (state, action) => {
      state.sortType =  action.payload;
    });
});
