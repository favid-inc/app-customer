import axios from 'axios';
import { api } from '../config';

axios.defaults.baseURL = api.baseURL;
axios.defaults.headers = {
  'Content-Type': 'application/json',
};

export const axiosInstance = idToken => {
  axios.defaults.baseURL = api.baseURL;
  axios.defaults.headers = {
    ...axios.defaults.headers,
    Authorization: `Bearer ${idToken}`,
  };
  return axios;
};
