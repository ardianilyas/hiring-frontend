import { useQuery } from '@tanstack/react-query';
import { getJobOpenings } from '@/shared/api/jobOpenings';

export function useJobOpenings(page: number, limit: number = 6) {
  return useQuery({
    queryKey: ['jobOpenings', page],
    queryFn: () => getJobOpenings({ page, limit })
  });
}
