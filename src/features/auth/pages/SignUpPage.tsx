import { AuthLayout } from '../components/AuthLayout';
import { SignUpForm } from '../components/SignUpForm';

export function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
