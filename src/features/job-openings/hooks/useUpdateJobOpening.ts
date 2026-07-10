import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateJobOpening } from '../api/updateJobOpening';
import type { UpdateJobOpeningPayload } from '../types';

export const useUpdateJobOpening = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateJobOpeningPayload }) => updateJobOpening(id, payload),
    onSuccess: () => {
      toast.success('Job opening updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobOpenings'] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update job opening';
      toast.error(message);
    },
  });
};
