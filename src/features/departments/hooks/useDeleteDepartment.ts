import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteDepartment } from '../api/deleteDepartment';

export const useDeleteDepartment = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => {
      toast.success('Department deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete department';
      toast.error(message);
    },
  });
};
