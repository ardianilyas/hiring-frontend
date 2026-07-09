import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createDepartment } from '../api/createDepartment';
import type { CreateDepartmentPayload } from '../api/createDepartment';

export const useCreateDepartment = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDepartmentPayload) => createDepartment(payload),
    onSuccess: () => {
      toast.success('Department created successfully!');
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create department';
      toast.error(message);
    },
  });
};
