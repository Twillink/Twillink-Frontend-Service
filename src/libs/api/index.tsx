import {AppDispatch} from '../store/store';
import createApiClient from './apiClient';

export const apiAuthLogin = async (
  dispatch: AppDispatch,
  body: any,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/user-auth/login', body);
};

export const apiLinkCheck = async (
  dispatch: AppDispatch,
  username: string,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.get(`/api/v1/link/check?userName=${username}`);
};

export const apiAuthCheckEmail = async (
  dispatch: AppDispatch,
  email: string,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.get(
    `/api/v1/user-auth/check-mail-registered?email=${email}`,
  );
};

export const apiOtpSend = async (
  dispatch: AppDispatch,
  body: any,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/otp/send-email', body);
};

export const apiOtpValidate = async (
  dispatch: AppDispatch,
  body: any,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/otp/validate', body);
};

export const apiAuthRegister = async (
  dispatch: AppDispatch,
  body: any,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/user-auth/register', body);
};

export const apiAuthLogout = async (
  dispatch: AppDispatch,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/user-auth/logout');
};
