import type { JobOpening } from '@/features/job-openings/types';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Application {
  id: string;
  jobOpeningId: string;
  userId: string;
  resume: string;
  coverLetter?: string;
  status: 'applied' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  feedback?: string;
  createdAt: string;
  updatedAt: string;
  jobOpening?: JobOpening;
  user?: User;
}

export interface GetApplicationsParams {
  page?: number;
  limit?: number;
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

export type GetApplicationsResponse = PaginatedResponse<Application>;

export interface SubmitApplicationPayload {
  jobOpeningId: string;
  resume: string;
  coverLetter?: string;
}

export interface UpdateApplicationStatusPayload {
  status: 'applied' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  feedback?: string;
}
