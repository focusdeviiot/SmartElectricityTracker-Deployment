import apiClient from './axios';
import { Response } from '../models/response';
import { DecodeTokenAndSetLocalStorage } from '../helpers/DecodeJWT';

export const login = async (username: string, password: string): Promise<Response> => {
  try {
    const response = await apiClient.post<Response>('/login', { username, password });
    await DecodeTokenAndSetLocalStorage(response.data.data);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refresh_token');
  await apiClient.post('/logout', { refresh_token: refreshToken });
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_username');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_exp');
};

export const checkToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token found');
    const response = await apiClient.get('/check-token');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};