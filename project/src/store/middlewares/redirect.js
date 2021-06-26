import browserHistory from '../../browser-histiry';
import { ActionType } from '../action';

export const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
