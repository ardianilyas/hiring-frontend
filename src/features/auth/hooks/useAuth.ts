import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { login, register, logout } from '../api/authApi';
import { useAuthStore } from '../../../shared/store/authStore';
import type { LoginValues, RegisterValues } from '../schema';

export function useLogin() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: LoginValues) => login(data),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to login. Please try again.';
      toast.error(message);
    }
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: RegisterValues) => register(data),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to register. Please try again.';
      toast.error(message);
    }
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setUser(null);
      toast.success('Successfully logged out!');
      navigate('/sign-in');
    },
    onError: () => {
      toast.error('Failed to logout. Please try again.');
    }
  });
}

import { useQuery } from '@tanstack/react-query';
import { getSession } from '../api/authApi';

export function useSessionCheck() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  return useQuery({
    queryKey: ['session'],
    queryFn: () => getSession(),
    // Only run this query if the user is considered authenticated by zustand
    enabled: isAuthenticated,
    retry: false,
    // Refetch when the user refocuses the window to ensure session is always fresh
    refetchOnWindowFocus: true,
  });
}
