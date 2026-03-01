import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/components/layout/Container';

/**
 * Componente para proteger rotas que requerem permissões específicas
 */
export default function AdminRoute({ children, requiredRole = 'editor' }) {
  const { user, loading: authLoading } = useAuth();
  const { hasRole, loading: roleLoading } = useRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return (
      <Container className="py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Container>
    );
  }

  if (!user) {
    // Redireciona para login se não estiver autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRole(requiredRole)) {
    // Redireciona para home se não tiver permissão
    return <Navigate to="/" replace />;
  }

  return children;
}


