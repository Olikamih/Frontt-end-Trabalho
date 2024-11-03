import axios, { AxiosResponse, CancelTokenSource } from 'axios';

import { getCookie } from './storage';
import { COOKIE_REFRESH_TOKEN, COOKIE_TOKEN } from './account';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
});

interface Request {
  cancel: () => void;
  send: () => Promise<AxiosResponse>;
}

const cancel = (signal: CancelTokenSource) => () => signal.cancel('canceled');

const getHeaders = () => {
  const token = getCookie(COOKIE_TOKEN);
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const apiRefreshToken = () => {
  const refreshToken = getCookie(COOKIE_REFRESH_TOKEN);
  const options = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  return api.post('/refresh', {}, options);
};

export const apiPost = (path: string, data = {}): Promise<AxiosResponse> => {
  const options = {
    headers: getHeaders(),
  };

  return api.post(path, data, options);
};

export const apiPut = (path: string, data = {}): Promise<AxiosResponse> => {
  const options = {
    headers: getHeaders(),
  };

  return api.put(path, data, options);
};

export const apiGet = (path: string): Request => {
  const signal = axios.CancelToken.source();
  const options = {
    headers: getHeaders(),
    cancelToken: signal.token,
  };

  return {
    cancel: cancel(signal),
    send: () => api.get(path, options),
  };
};
