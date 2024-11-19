import {AppDispatch} from '../store/store';
import {IAddAttachment} from '../types/IAttachmentData';
import createApiClient from './apiClient';
import {
  IAddWidgetBlog,
  IAddWidgetCarousel,
  IAddWidgetContact,
  IAddWidgetImage,
  IAddWidgetLink,
  IAddWidgetMap,
  IAddWidgetPdf,
  IAddWidgetSocial,
  IAddWidgetText,
  IAddWidgetVideo,
  IAddWidgetWebinar,
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

export const apiGetPlaces = async (
  dispatch: AppDispatch,
  search: string,
  showToasts = false,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.get(
    `https://nominatim.openstreetmap.org/search?q=${search}&format=json`,
  );
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

export const apiGetWidgetUserData = async (
  dispatch: AppDispatch,
  showToasts = true,
  username = '',
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.get('/api/v1/widget/' + username);
};

export const apiAddWidgetLink = async (
  dispatch: AppDispatch,
  body: IAddWidgetLink,
  showToasts = true,
) => {
  const message = {
    success: 'Link Successfully Saved',
    error: 'Failed to Save Link',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.post('/api/v1/widget-link', body);
};

export const apiAddWidgetText = async (
  dispatch: AppDispatch,
  body: IAddWidgetText,
  showToasts = true,
) => {
  const message = {
    success: 'Text Successfully Saved',
    error: 'Failed to Save Text',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.post('/api/v1/widget-text', body);
};

export const apiAddWidgetImage = async (
  dispatch: AppDispatch,
  body: IAddWidgetImage,
  showToasts = true,
) => {
  const message = {
    success: 'Image Successfully Saved',
    error: 'Failed to Save Image',
  };
  const api = createApiClient(dispatch, showToasts, true, message);
  return await api.post('/api/v1/widget-image', body);
};

export const apiAddWidgetVideo = async (
  dispatch: AppDispatch,
  body: IAddWidgetVideo,
  showToasts = true,
) => {
  const message = {
    success: 'Video Successfully Saved',
    error: 'Failed to Save Video',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.post('/api/v1/widget-video', body);
};

export const apiAddWidgetPdf = async (
  dispatch: AppDispatch,
  body: IAddWidgetPdf,
  showToasts = true,
) => {
  const message = {
    success: 'PDF File Successfully Added',
    error: 'Failed to Add PDF File',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.post('/api/v1/widget-pdf', body);
};

export const apiAddWidgetWebinar = async (
  dispatch: AppDispatch,
  body: IAddWidgetWebinar,
  showToasts = true,
) => {
  const message = {
    success: 'Webinar Successfully Saved',
    error: 'Failed to Save Webinar',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.post('/api/v1/widget-webinar', body);
};
export const apiAddWidgetBlog = async (
  dispatch: AppDispatch,
  body: IAddWidgetBlog,
  showToasts = true,
) => {
  const message = {
    success: 'Blog Content Successfully Published',
    error: 'Failed to Publish Blog Content',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.post('/api/v1/widget-blog', body);
};

export const apiAddWidgetCarousel = async (
  dispatch: AppDispatch,
  body: IAddWidgetCarousel,
  showToasts = true,
) => {
  const message = {
    success: 'Carousel Successfully Saved',
    error: 'Failed to Save Carousel',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
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
  const message = {
    success: 'Contact Successfully Saved',
    error: 'Failed to Save Contact',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.post('/api/v1/widget-contact', body);
};

export const apiAddWidgetSocial = async (
  dispatch: AppDispatch,
  body: IAddWidgetSocial,
  showToasts = true,
) => {
  const message = {
    success: 'Social Media Account Successfully Saved',
    error: 'Failed to Save Social Media Account',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.post('/api/v1/widget-sosmed', body);
};

export const apiAddWidgetMap = async (
  dispatch: AppDispatch,
  body: IAddWidgetMap,
  showToasts = true,
) => {
  const message = {
    success: 'Map Successfully Saved',
    error: 'Failed to Save Map',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.post('/api/v1/widget-map', body);
};

export const apiRemoveWidget = async (
  dispatch: AppDispatch,
  id: any,
  showToasts = true,
) => {
  const message = {
    success: 'Widget Successfully Deleted',
    error: 'Failed to Delete Widget',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.delete(`/api/v1/widget/${id}`);
};

export const apiRemoveSocial = async (
  dispatch: AppDispatch,
  id: any,
  showToasts = true,
) => {
  const message = {
    success: 'Social Successfully Deleted',
    error: 'Failed to Delete Social',
  };
  const api = createApiClient(dispatch, showToasts, false, message);
  return await api.delete(`/api/v1/widget-sosmed/${id}`);
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
  description: string;
  urlBanner: string;
  urlImageProfile: string;
  phoneNumber?: string;
}

export const apiUpdateUserProfile = async (
  dispatch: AppDispatch,
  body: IUpdateUserProfileBody,
  showToasts = true,
) => {
  const api = createApiClient(dispatch, showToasts);
  return await api.post('/api/v1/widget-profile', body);
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
