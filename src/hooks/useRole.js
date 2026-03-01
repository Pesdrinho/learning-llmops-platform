import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook para verificar permissões de usuário
 */
export function useRole() {
  const { user, userRole, loading } = useAuth();
  
  const roleHierarchy = {
    user: 1,
    editor: 2,
    admin: 3,
  };
  
  /**
   * Verifica se o usuário tem uma role específica ou superior
   */
  const hasRole = (requiredRole) => {
    if (!user || !userRole) return false;
    
    const userLevel = roleHierarchy[userRole] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
  };
  
  /**
   * Verifica se o usuário é admin
   */
  const isAdmin = () => hasRole('admin');
  
  /**
   * Verifica se o usuário é editor ou superior
   */
  const isEditor = () => hasRole('editor');
  
  /**
   * Verifica se o usuário pode gerenciar conteúdo (editor ou admin)
   */
  const canManageContent = () => isEditor();
  
  /**
   * Verifica se o usuário pode gerenciar usuários (apenas admin)
   */
  const canManageUsers = () => isAdmin();
  
  return {
    userRole,
    loading,
    hasRole,
    isAdmin,
    isEditor,
    canManageContent,
    canManageUsers,
  };
}


