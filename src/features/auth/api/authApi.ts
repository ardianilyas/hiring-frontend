import { apiClient } from '../../../shared/api/axios';
import type { LoginValues, RegisterValues } from '../schema';

export const login = async (data: LoginValues) => {
  const response = await apiClient.post('/auth/sign-in/email', data);
  return response.data;
};

export const register = async (data: RegisterValues) => {
  const response = await apiClient.post('/auth/sign-up/email', data);
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post('/auth/sign-out');
  return response.data;
};
