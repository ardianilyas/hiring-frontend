import { apiClient } from '@/shared/api/axios';
import type { GetDepartmentsResponse } from '../types';

export const getDepartments = async (): Promise<GetDepartmentsResponse> => {
  const { data } = await apiClient.get<GetDepartmentsResponse>('/departments');
  return data;
};
