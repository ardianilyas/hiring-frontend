import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteJobOpening } from '../api/deleteJobOpening';

export const useDeleteJobOpening = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJobOpening(id),
    onSuccess: () => {
      toast.success('Job opening deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobOpenings'] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete job opening';
      toast.error(message);
    },
  });
};
