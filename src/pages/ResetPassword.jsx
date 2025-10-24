import ResetPasswordForm from '@components/auth/ResetPasswordForm';
import SEO from '@components/SEO';

/**
 * Página de Recuperação de Senha
 */
export default function ResetPassword() {
  return (
    <>
      <SEO title="Recuperar Senha" description="Recupere o acesso à sua conta" />
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
        <div className="w-full max-w-md">
          <ResetPasswordForm />
        </div>
      </div>
    </>
  );
}





