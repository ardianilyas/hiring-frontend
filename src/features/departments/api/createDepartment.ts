import { apiClient } from '@/shared/api/axios';
import type { Department } from '../types';

export interface CreateDepartmentPayload {
  name: string;
  description?: string;
}

export interface CreateDepartmentResponse {
  success: boolean;
  message: string;
  data: Department;
}

export const createDepartment = async (payload: CreateDepartmentPayload): Promise<CreateDepartmentResponse> => {
  const { data } = await apiClient.post<CreateDepartmentResponse>('/departments', payload);
  return data;
};
