import {TypeOtpEnum} from '../types/TypeOtpEnum';
import api from './apiClient';

export const apiAuthLogin = async (email: string, password: string) => {
  return await api.post('/api/v1/user-auth/login', {email, password});
};

export const apiLinkCheck = async (username: string) => {
  return await api.get(`/api/v1/link/check?userName=${username}`);
};

export const apiAuthCheckEmail = async (email: string) => {
  return await api.get(
    `/api/v1/user-auth/check-mail-registered?email=${email}`,
  );
};

export const apiOtpSend = async (email: string, typeOtp: TypeOtpEnum) => {
  return await api.post('/api/v1/otp/send-email', {email, typeOtp});
};

export const apiOtpValidate = async (codeOtp: string, email: string) => {
  return await api.post('/api/v1/otp/validate', {codeOtp, email});
};

export const apiAuthRegister = async (
  userName: string,
  email: string,
  password: string,
) => {
  return await api.post('/api/v1/user-auth/register', {
    userName,
    email,
    phoneNumber: '',
    fullName: '',
    password,
  });
};

export const apiAuthLogout = async () => {
  return await api.post('/api/v1/user-auth/logout');
};
