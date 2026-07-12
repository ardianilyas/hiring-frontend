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
      let message = error.response?.data?.message || 'Failed to delete job opening';
      
      // Friendly message for backend foreign key constraint errors
      if (message.toLowerCase().includes("related record") || message.toLowerCase().includes("foreign key")) {
        message = "Cannot delete this job because it has active applications. Please edit and set it to Inactive instead.";
      }
      
      toast.error(message);
    },
  });
};
