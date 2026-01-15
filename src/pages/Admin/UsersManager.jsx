import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/layout/Container';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertCircle, Shield } from 'lucide-react';
import { listUsers, updateUserRole } from '@/lib/api';

export default function UsersManager() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const data = await listUsers(token);
      setUsers(data);
    } catch (err) {
      setError(`Erro ao carregar usuários: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!confirm(`Alterar role do usuário para "${newRole}"?`)) return;

    try {
      setError(null);
      const token = await user.getIdToken();
      await updateUserRole(token, userId, newRole);
      setSuccess(true);
      loadUsers();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(`Erro ao atualizar role: ${err.message}`);
    }
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'editor':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      <SEO title="Gerenciar Usuários" />

      <Container className="py-12">
        <div className="max-w-5xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Admin
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Gerenciar Roles de Usuários</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 border-green-500 text-green-700">
                  <AlertDescription>
                    Role atualizada com sucesso!
                  </AlertDescription>
                </Alert>
              )}

              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Carregando usuários...
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum usuário encontrado
                </div>
              ) : (
                <div className="space-y-3">
                  {users.map((userItem) => (
                    <div
                      key={userItem.uid}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{userItem.display_name || userItem.email}</div>
                        <div className="text-sm text-muted-foreground">{userItem.email}</div>
                        {userItem.uid === user.uid && (
                          <Badge variant="outline" className="mt-1">Você</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant={getRoleBadgeVariant(userItem.role)}>
                          {userItem.role}
                        </Badge>

                        <select
                          value={userItem.role}
                          onChange={(e) => handleRoleChange(userItem.uid, e.target.value)}
                          disabled={userItem.uid === user.uid}
                          className="px-3 py-2 border rounded-md text-sm bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="user">User</option>
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Sobre as Roles:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>User:</strong> Acesso padrão à plataforma</li>
                  <li>• <strong>Editor:</strong> Pode criar e editar posts do blog e podcasts</li>
                  <li>• <strong>Admin:</strong> Controle total, incluindo gerenciar usuários e deletar conteúdo</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}


