import axios from 'axios';
import {showToast} from '@/libs/store/features/toastSlice';
import {ToastType} from '@/libs/types/ToastType';
import {ErrorApiResponseType} from '@/libs/types/ErrorApiResponseType';
import {AppDispatch} from '@/libs/store/store';

const defaultTimeout = 1000 * 90;
const createApiClient = (dispatch: AppDispatch, showToasts = true) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: defaultTimeout,
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
    response => {
      if (showToasts) {
        dispatch(
          showToast({
            title: 'Success',
            message: response.data.message || 'Action completed successfully.',
            type: ToastType.SUCCESS,
          }),
        );
      }
      return response;
    },
    error => {
      const formattedError = getError(error);
      if (showToasts) {
        dispatch(
          showToast({
            title: 'Error',
            message:
              formattedError.message || 'Something went wrong. Please retry.',
            type: ToastType.ERROR,
          }),
        );
      }
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

  return axiosInstance;
};

export default createApiClient;
