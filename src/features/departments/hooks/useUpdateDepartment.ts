import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateDepartment } from '../api/updateDepartment';
import type { UpdateDepartmentPayload } from '../api/updateDepartment';

export const useUpdateDepartment = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateDepartmentPayload }) => updateDepartment(id, payload),
    onSuccess: () => {
      toast.success('Department updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update department';
      toast.error(message);
    },
  });
};
