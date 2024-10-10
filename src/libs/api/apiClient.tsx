import axios from 'axios';
import {ErrorApiResponseType} from '../types/ErrorApiResponseType';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {'Content-Type': 'application/json'},
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const formattedError = getError(error);
    return Promise.reject(formattedError);
  },
);

function getError(error: any): ErrorApiResponseType {
  const code = error?.response?.status ?? null;
  let message = error?.response?.data?.message ?? 'An unknown error occurred';

  const validationMap = error?.response?.data?.message || [];
  if (Array.isArray(validationMap) && validationMap.length > 0) {
    const arrayMsg = validationMap.join('<br />');
    message = arrayMsg || message;
  }

  return {
    title: 'Error',
    message,
    type: 'danger',
    status: code,
    data: error?.response?.data ?? null,
  };
}

export default axiosInstance;
