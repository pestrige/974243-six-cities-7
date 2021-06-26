import axios from 'axios';
import { getUserDataFromStorage } from '../utils/common';

const SERVER_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const HttpCode = {
  UNAUTHORIZED: 401,
};

const userData = getUserDataFromStorage();
const token = userData?.token ?? '';

export const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'x-token': token,
    },
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    const { response } = error;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
