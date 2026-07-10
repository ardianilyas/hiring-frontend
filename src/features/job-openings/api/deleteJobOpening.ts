import { apiClient } from '@/shared/api/axios';

export interface DeleteJobOpeningResponse {
  success: boolean;
  message: string;
}

export const deleteJobOpening = async (id: string): Promise<DeleteJobOpeningResponse> => {
  const { data } = await apiClient.delete<DeleteJobOpeningResponse>(`/job-openings/${id}`);
  return data;
};
