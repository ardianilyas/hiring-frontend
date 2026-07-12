import { apiClient } from '@/shared/api/axios';
import type { 
  Application, 
  GetApplicationsParams, 
  GetApplicationsResponse, 
  SubmitApplicationPayload, 
  UpdateApplicationStatusPayload 
} from '../types';

export const submitApplication = async (payload: SubmitApplicationPayload) => {
  const { data } = await apiClient.post<{ success: boolean; message: string; data: Application }>('/applications', payload);
  return data;
};

export const getMyApplications = async (params?: GetApplicationsParams) => {
  const { data } = await apiClient.get<GetApplicationsResponse>('/applications/me', { params });
  return data;
};

export const getAllApplications = async (params?: GetApplicationsParams) => {
  const { data } = await apiClient.get<GetApplicationsResponse>('/applications', { params });
  return data;
};

export const getApplicationDetail = async (id: string) => {
  const { data } = await apiClient.get<{ success: boolean; data: Application }>(`/applications/${id}`);
  return data;
};

export const updateApplicationStatus = async (id: string, payload: UpdateApplicationStatusPayload) => {
  const { data } = await apiClient.patch<{ success: boolean; data: Application }>(`/applications/${id}/status`, payload);
  return data;
};
