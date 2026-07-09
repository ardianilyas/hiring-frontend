import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '../api/getDepartments';

export function useDepartments() {
  return useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });
}
