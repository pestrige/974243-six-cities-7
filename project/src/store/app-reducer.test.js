import { appReducer } from './app-reducer';
import { ActionType } from './action';
import { SortType, Cities } from '../const';

describe('App Reducer', () => {
  it('should return initial state by default', () => {
    const cities = Object.values(Cities);
    const initialState = {
      city: Cities.PARIS,
      cities,
      sortType: SortType.DEFAULT,
    };

    expect(appReducer(undefined, {})).toEqual(initialState);
  });

  it('should change city by a given city name and change sort type by default', () => {
    const state = {
      cities: [{name: 'Paris'}, {name: 'Cologne'}, {name: 'Amsterdam'}],
      city: {name: 'Cologne'},
      sortType: SortType.LOW_PRICE,
    };

    const changedCityName = 'Paris';
    const changeCityAction = {
      type: ActionType.CHANGE_CITY,
      payload: changedCityName,
    };
    const expectedState = {
      cities: [{name: 'Paris'}, {name: 'Cologne'}, {name: 'Amsterdam'}],
      city: {name: changedCityName},
      sortType: SortType.DEFAULT,
    };

    expect(appReducer(state, changeCityAction)).toEqual(expectedState);
  });

  it('should change sort type by a given value', () => {
    const state = {sortType: SortType.LOW_PRICE};

    const changedSortType = {sortType: SortType.DEFAULT};
    const changeCityAction = {
      type: ActionType.SORT,
      payload: changedSortType,
    };
    const expectedState = {sortType: changedSortType};

    expect(appReducer(state, changeCityAction)).toEqual(expectedState);
  });
});
