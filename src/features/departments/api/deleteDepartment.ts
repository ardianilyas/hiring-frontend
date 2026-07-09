import { apiClient } from '@/shared/api/axios';

export interface DeleteDepartmentResponse {
  success: boolean;
  message: string;
}

export const deleteDepartment = async (id: string): Promise<DeleteDepartmentResponse> => {
  const { data } = await apiClient.delete<DeleteDepartmentResponse>(`/departments/${id}`);
  return data;
};
