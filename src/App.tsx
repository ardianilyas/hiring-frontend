import { useAuthStore } from './shared/store/authStore';
import { useLogout } from './features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import './App.css';

function App() {
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.name || 'User'}!</h1>
      <p className="text-slate-600 mb-8">You are logged in as {user?.email}</p>
      
      <AlertDialog>
        <AlertDialogTrigger 
          render={
            <Button variant="destructive" disabled={logoutMutation.isPending}>
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          }
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will log you out of your account. You will need to enter your credentials to access the dashboard again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => logoutMutation.mutate()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default App;
