import api from './apiClient';

export const apiAuthLogin = async (email: string, password: string) => {
  return await api.post('/api/v1/user-auth/login', {email, password});
};

export const apiAuthLogout = async () => {
  return await api.post('/api/v1/user-auth/logout');
};
