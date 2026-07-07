import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router';
import { registerSchema, type RegisterValues } from '../schema';
import { useRegister } from '../hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = (data: RegisterValues) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-2 text-slate-900">Get Started Now</h2>
        <p className="text-sm text-slate-500">Enter your credentials to create an account</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-slate-700">Name</Label>
          <Input 
            id="name" 
            placeholder="John Doe" 
            className="h-12 rounded-xl border-slate-200"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</Label>
          <Input 
            id="email" 
            placeholder="username@company.com" 
            className="h-12 rounded-xl border-slate-200"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="min 8 chars" 
              className="h-12 rounded-xl border-slate-200 pr-10"
              {...form.register("password")}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-base font-medium rounded-xl mt-2" 
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Loading..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-8 text-sm">
        <span className="text-slate-600">Have an account? </span>
        <Link to="/sign-in" className="font-medium text-blue-600 hover:text-blue-700">
          Sign in
        </Link>
      </div>
    </div>
  );
}
