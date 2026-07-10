import { apiClient } from '@/shared/api/axios';
import type { GetJobOpeningsParams, GetJobOpeningsResponse } from '../types';

export const getJobOpenings = async (params?: GetJobOpeningsParams): Promise<GetJobOpeningsResponse> => {
  const { data } = await apiClient.get<GetJobOpeningsResponse>('/job-openings', { params });
  return data;
};
