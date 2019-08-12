import axios from 'axios';
import { api } from '../config';

axios.defaults.baseURL = api.baseURL;
axios.defaults.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

axios.interceptors.request.use(config => {
  console.log('[Axios.ts] reqInterceptor() config.headers: ', config.headers);
  console.log('[Axios.ts] reqInterceptor() config.data: ', config.data);
  return config;
});

export const axiosInstance = idToken => {
  axios.defaults.baseURL = api.baseURL;
  axios.defaults.headers = {
    ...axios.defaults.headers,
    Authorization: `Bearer ${idToken}`,
  };
  return axios;
};
