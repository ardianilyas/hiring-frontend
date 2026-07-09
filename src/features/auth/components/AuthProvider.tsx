import { useSessionCheck } from '../hooks/useAuth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // This hook will silently run a background check to validate the session
  // If it fails with a 401, the axios interceptor will handle clearing the zustand store!
  useSessionCheck();

  return <>{children}</>;
}
