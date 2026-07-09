import { apiClient } from '@/shared/api/axios';
import type { Department } from '../types';

export interface UpdateDepartmentPayload {
  name?: string;
  description?: string;
}

export interface UpdateDepartmentResponse {
  success: boolean;
  message: string;
  data: Department;
}

export const updateDepartment = async (id: string, payload: UpdateDepartmentPayload): Promise<UpdateDepartmentResponse> => {
  const { data } = await apiClient.put<UpdateDepartmentResponse>(`/departments/${id}`, payload);
  return data;
};
