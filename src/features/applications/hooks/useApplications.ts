import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  submitApplication, 
  getMyApplications, 
  getAllApplications, 
  getApplicationDetail, 
  updateApplicationStatus 
} from '../api';
import type { GetApplicationsParams } from '../types';
import { toast } from 'sonner';

export const useSubmitApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myApplications'] });
      toast.success('Application submitted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    }
  });
};

export const useMyApplications = (params?: GetApplicationsParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['myApplications', params],
    queryFn: () => getMyApplications(params),
    enabled,
  });
};

export const useAllApplications = (params?: GetApplicationsParams) => {
  return useQuery({
    queryKey: ['applications', params],
    queryFn: () => getAllApplications(params),
  });
};

export const useApplicationDetail = (id: string | null) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => id ? getApplicationDetail(id) : null,
    enabled: !!id,
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: any }) => updateApplicationStatus(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['application', variables.id] });
      toast.success('Status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  });
};
