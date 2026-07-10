export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';

export type JobOpening = {
  id: string;
  departmentId: string;
  title: string;
  description: string;
  location: string;
  employmentType?: EmploymentType;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  department?: {
    id: string;
    name: string;
  };
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  nextUrl: string | null;
  prevUrl: string | null;
};

export type GetJobOpeningsResponse = {
  success: boolean;
  message: string;
  data: JobOpening[];
  meta: PaginationMeta;
};

export type CreateJobOpeningPayload = {
  departmentId: string;
  title: string;
  description: string;
  location: string;
  employmentType?: EmploymentType;
  isActive?: boolean;
};

export type UpdateJobOpeningPayload = Partial<CreateJobOpeningPayload>;

export type GetJobOpeningsParams = {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  departmentId?: string;
  employmentType?: EmploymentType;
};
