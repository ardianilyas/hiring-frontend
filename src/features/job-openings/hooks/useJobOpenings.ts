import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getJobOpenings } from '../api/getJobOpenings';
import type { GetJobOpeningsParams } from '../types';

export const useJobOpenings = (params?: GetJobOpeningsParams) => {
  return useQuery({
    queryKey: ['jobOpenings', params],
    queryFn: () => getJobOpenings(params),
    placeholderData: keepPreviousData,
  });
};
