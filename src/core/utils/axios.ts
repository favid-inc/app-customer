import axios from 'axios';
import { api } from '../config';

export const axiosInstance = idToken => {
  const reqInterceptor = axios.interceptors.request.use(config => {
    config.headers = {
      ...config.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    };

    console.log('[Axios.ts] reqInterceptor() config: ', config);
    return config;
  });

  axios.interceptors.request.eject(reqInterceptor);
  axios.defaults.baseURL = api.baseURL;
  return axios;
};
