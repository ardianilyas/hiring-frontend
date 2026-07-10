import { apiClient } from '@/shared/api/axios';
import type { CreateJobOpeningPayload, JobOpening } from '../types';

export interface CreateJobOpeningResponse {
  success: boolean;
  message: string;
  data: JobOpening;
}

export const createJobOpening = async (payload: CreateJobOpeningPayload): Promise<CreateJobOpeningResponse> => {
  const { data } = await apiClient.post<CreateJobOpeningResponse>('/job-openings', payload);
  return data;
};
