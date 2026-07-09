import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Layers, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../../../shared/store/authStore';
import { useLogout } from '../../auth/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
    setShowLogoutAlert(false);
  };

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4 animate-in slide-in-from-top-4 duration-500">
        <div className="bg-white/80 backdrop-blur-md shadow-sm border border-brand-border rounded-full h-16 px-6 w-full max-w-5xl flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-brand-secondary tracking-tight">HireFlow</span>
          </div>

          {/* Center Navigation (Desktop Only) */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#jobs" className="text-sm font-medium text-brand-gray hover:text-brand-primary transition-colors">
              Jobs
            </a>
            <a href="#contact" className="text-sm font-medium text-brand-gray hover:text-brand-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-brand-border text-brand-secondary hover:bg-brand-light font-medium h-9 px-4 text-sm outline-none transition-colors cursor-pointer shadow-sm bg-white hover:ring-2 hover:ring-brand-primary/20">
                  {user?.name || 'User'}
                  <ChevronDown className="w-4 h-4 text-brand-gray" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-brand-secondary">{user?.name || 'User'}</p>
                        <p className="text-xs leading-none text-brand-gray">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  {user?.role === 'admin' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer text-brand-secondary">
                        <LayoutDashboard className="mr-2 h-4 w-4 text-brand-gray" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem 
                    onClick={() => setShowLogoutAlert(true)} 
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/sign-in">
                <Button className="bg-brand-secondary hover:bg-brand-secondary/90 text-white rounded-full font-medium h-9 px-6 shadow-sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Logout Alert Dialog */}
      <AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will log you out of your account. You will need to enter your credentials to access the dashboard again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLogout}
              variant="destructive"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
