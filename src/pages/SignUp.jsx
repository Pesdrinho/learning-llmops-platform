import SignUpForm from '@components/auth/SignUpForm';
import SEO from '@components/SEO';

/**
 * Página de Cadastro
 */
export default function SignUp() {
  return (
    <>
      <SEO title="Cadastro" description="Crie sua conta" />
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
    </>
  );
}





