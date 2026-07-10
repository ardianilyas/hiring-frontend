import { apiClient } from '@/shared/api/axios';
import type { UpdateJobOpeningPayload, JobOpening } from '../types';

export interface UpdateJobOpeningResponse {
  success: boolean;
  message: string;
  data: JobOpening;
}

export const updateJobOpening = async (id: string, payload: UpdateJobOpeningPayload): Promise<UpdateJobOpeningResponse> => {
  const { data } = await apiClient.put<UpdateJobOpeningResponse>(`/job-openings/${id}`, payload);
  return data;
};
