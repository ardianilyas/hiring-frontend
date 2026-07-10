import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createJobOpening } from '../api/createJobOpening';
import type { CreateJobOpeningPayload } from '../types';

export const useCreateJobOpening = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateJobOpeningPayload) => createJobOpening(payload),
    onSuccess: () => {
      toast.success('Job opening created successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobOpenings'] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create job opening';
      toast.error(message);
    },
  });
};
