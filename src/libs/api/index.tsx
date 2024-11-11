import {AppDispatch} from '../store/store';
import {IAddAttachment} from '../types/IAttachmentData';
import createApiClient from './apiClient';
import {
  IAddWidgetCarousel,
  IAddWidgetContact,
  IAddWidgetImage,
  IAddWidgetLink,
  IAddWidgetText,
  IAddWidgetVideo,
  IChangeOrderWidgetItem,
  IChangeWidthWidget,
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
  return await api.get(`/api/v1/link/check/${username}`);
};

export const apiAuthCheckEmail = async (
  dispatch: AppDispatch,
  email: string,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.get(`/api/v1/user-auth/check-mail-registered/${email}`);
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

export const apiAddWidgetCarousel = async (
  dispatch: AppDispatch,
  body: IAddWidgetCarousel,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/widget-carousel', {
    ...body,
    attachmentIds: body.attachmentIds,
  });
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

export const apiGetUserProfile = async (
  dispatch: AppDispatch,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.get('/api/v1/user-auth/verifySessions');
};
export interface IChangePasswordBody {
  currentPassword: string;
  newPassword: string;
}

export const apiChangePassword = async (
  dispatch: AppDispatch,
  body: IChangePasswordBody,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/user-auth/change-password', body);
};

export interface IUpdateUserProfileBody {
  fullName: string;
  phoneNumber: string;
}

export const apiUpdateUserProfile = async (
  dispatch: AppDispatch,
  body: IUpdateUserProfileBody,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.put('/api/v1/profile', body);
};

export const apiGetCountry = async (
  dispatch: AppDispatch,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.get('/api/v1/country');
};

export const apiChangeWidthWidget = async (
  dispatch: AppDispatch,
  body: IChangeWidthWidget,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.put(`/api/v1/widget/change-width/${body.id}`, body);
};

export const apiChangeOrderWidget = async (
  dispatch: AppDispatch,
  body: IChangeOrderWidgetItem[],
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post(`/api/v1/widget/order`, JSON.stringify(body));
};

export const apiAddAttachment = async (
  dispatch: AppDispatch,
  body: IAddAttachment,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts, true);
  const formData = new FormData();
  for (let i = 0; i < body.files.length; i++) {
    formData.append('file', body.files[i]);
  }

  return await api.post('/api/v1/Attachment/Upload', formData);
};

export const apiGetAttachmentById = async (
  dispatch: AppDispatch,
  id: number,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.get(`/api/v1/attachment/${id}`);
};
