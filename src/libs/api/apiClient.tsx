import axios from 'axios';
import {ToastType} from '@/libs/types/ToastType';
import {ErrorApiResponseType} from '@/libs/types/ErrorApiResponseType';
import {AppDispatch} from '@/libs/store/store';
import {handleShowToast} from '@/utils/toast';

const defaultTimeout = 1000 * 90;
const createApiClient = (
  dispatch: AppDispatch,
  showToasts = true,
  isMultipart = false,
) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: defaultTimeout,
    headers: {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    },
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
        handleShowToast(
          {
            title: 'Success',
            message: response.data.message || 'Action completed successfully.',
            type: ToastType.SUCCESS,
          },
          dispatch,
        );
      }
      return response;
    },
    error => {
      const formattedError = getError(error);
      if (showToasts) {
        handleShowToast(
          {
            title: 'Error',
            message:
              formattedError.message || 'Something went wrong. Please retry.',
            type: ToastType.ERROR,
          },
          dispatch,
        );
      }
      return Promise.reject(formattedError);
    },
  );

  function getError(error: any): ErrorApiResponseType {
    const code = error?.response?.status ?? null;
    let message = error?.response?.data?.message ?? 'An unknown error occurred';

    if (typeof message === 'object' && message !== null) {
      let newMessage = '';
      for (const key in message) {
        if (message.hasOwnProperty(key)) {
          newMessage += `${message[key] || ''}`.trim() + ' ';
        }
      }
      message = newMessage;
    }

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
