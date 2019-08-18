import * as config from '@src/core/config';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: config.api.baseURL,
  headers: {
    Accept: 'application/json',
  },
});
