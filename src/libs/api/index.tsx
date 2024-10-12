import api from './apiClient';

export const apiAuthLogin = async (body: any) => {
  return await api.post('/api/v1/user-auth/login', body);
};

export const apiLinkCheck = async (username: string) => {
  return await api.get(`/api/v1/link/check?userName=${username}`);
};

export const apiAuthCheckEmail = async (email: string) => {
  return await api.get(
    `/api/v1/user-auth/check-mail-registered?email=${email}`,
  );
};

export const apiOtpSend = async (body: any) => {
  return await api.post('/api/v1/otp/send-email', body);
};

export const apiOtpValidate = async (body: any) => {
  return await api.post('/api/v1/otp/validate', body);
};

export const apiAuthRegister = async (body: any) => {
  return await api.post('/api/v1/user-auth/register', body);
};

export const apiAuthLogout = async () => {
  return await api.post('/api/v1/user-auth/logout');
};
