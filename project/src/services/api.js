import axios from 'axios';
import { HttpCode } from '../const';

const SERVER_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createApi = (onUnauthorized, onShowToast) => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    const { response } = error;

    switch (response.status) {
      case HttpCode.UNAUTHORIZED:
        onUnauthorized();
        break;
      case HttpCode.NOT_FOUND:
      case HttpCode.BAD_REQUEST:
        break;
      default:
        onShowToast(`Error ${response.status}: ${response.statusText}`);
    }
    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
