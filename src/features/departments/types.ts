export type Department = {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type GetDepartmentsResponse = {
  success: boolean;
  message: string;
  data: Department[];
};
