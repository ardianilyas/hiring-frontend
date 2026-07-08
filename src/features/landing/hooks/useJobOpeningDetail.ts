import { useQuery } from '@tanstack/react-query';
import { getJobOpeningDetail } from '@/shared/api/jobOpenings';

export function useJobOpeningDetail(jobId: string | null) {
  return useQuery({
    queryKey: ['jobOpeningDetail', jobId],
    queryFn: () => getJobOpeningDetail(jobId!),
    enabled: !!jobId
  });
}
