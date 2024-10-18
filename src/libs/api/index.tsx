import {AppDispatch} from '../store/store';
import createApiClient from './apiClient';
import {
  IAddWidgetContact,
  IAddWidgetImage,
  IAddWidgetLink,
  IAddWidgetText,
  IAddWidgetVideo,
} from '@/libs/types/IAddWidgetData';

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

export const apiResetPassword = async (
  dispatch: AppDispatch,
  body: any,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post(`/api/v1/user-auth/forgot-password`, body);
};

export const apiGetWidgetData = async (
  dispatch: AppDispatch,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.get('/api/v1/widget');
};

export const apiAddWidgetLink = async (
  dispatch: AppDispatch,
  body: IAddWidgetLink,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/widget-link', body);
};

export const apiAddWidgetText = async (
  dispatch: AppDispatch,
  body: IAddWidgetText,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/widget-text', body);
};

export const apiAddWidgetImage = async (
  dispatch: AppDispatch,
  body: IAddWidgetImage,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/widget-image', body);
};

export const apiAddWidgetVideo = async (
  dispatch: AppDispatch,
  body: IAddWidgetVideo,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/widget-video', body);
};

export const apiAddWidgetContact = async (
  dispatch: AppDispatch,
  body: IAddWidgetContact,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/widget-contact', body);
};

export const apiRemoveWidget = async (
  dispatch: AppDispatch,
  id: any,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.delete(`/api/v1/widget/${id}`);
};
