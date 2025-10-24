import LoginForm from '@components/auth/LoginForm';
import SEO from '@components/SEO';

/**
 * Página de Login
 */
export default function Login() {
  return (
    <>
      <SEO title="Login" description="Entre na sua conta" />
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </>
  );
}





