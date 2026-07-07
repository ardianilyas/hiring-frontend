import { AuthLayout } from '../components/AuthLayout';
import { SignInForm } from '../components/SignInForm';

export function SignInPage() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}
