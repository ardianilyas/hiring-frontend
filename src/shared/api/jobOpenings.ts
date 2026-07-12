import { apiClient } from '@/shared/api/axios';

export interface JobOpening {
  id: string;
  departmentId: string;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  isActive: boolean;
  department?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  // Let's allow other fields for now to log them
  [key: string]: any; 
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    nextUrl: string | null;
    prevUrl: string | null;
  };
}

export interface SingleResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getJobOpenings = async (params?: { page?: number; limit?: number; search?: string; departmentId?: string; location?: string; employmentType?: string; isActive?: boolean }): Promise<PaginatedResponse<JobOpening>> => {
  const response = await apiClient.get('/job-openings', { params });
  return response.data;
};

export const getJobOpeningDetail = async (id: string): Promise<SingleResponse<JobOpening>> => {
  const response = await apiClient.get(`/job-openings/${id}`);
  return response.data;
};
