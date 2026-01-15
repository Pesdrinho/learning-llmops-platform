import { Link } from 'react-router-dom';
import Container from '@/components/layout/Container';
import SEO from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Mic, Users, Settings } from 'lucide-react';
import { useRole } from '@/hooks/useRole';

/**
 * Dashboard do painel administrativo
 */
export default function AdminDashboard() {
  const { isAdmin, canManageContent } = useRole();

  const adminSections = [
    {
      title: 'Posts do Blog',
      description: 'Criar, editar e gerenciar posts do blog',
      icon: FileText,
      href: '/admin/blog',
      requiredRole: 'editor',
    },
    {
      title: 'Podcasts',
      description: 'Upload e gerenciamento de episódios',
      icon: Mic,
      href: '/admin/podcasts',
      requiredRole: 'editor',
    },
    {
      title: 'Usuários',
      description: 'Gerenciar roles e permissões de usuários',
      icon: Users,
      href: '/admin/users',
      requiredRole: 'admin',
    },
  ];

  return (
    <>
      <SEO
        title="Painel Administrativo"
        description="Gerenciar conteúdo da plataforma LLMOps"
      />

      <Container className="py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Painel Administrativo
            </h1>
            <p className="text-lg text-muted-foreground">
              Gerencie o conteúdo e usuários da plataforma
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adminSections.map((section) => {
              const Icon = section.icon;
              const hasPermission = section.requiredRole === 'admin' ? isAdmin() : canManageContent();

              if (!hasPermission) return null;

              return (
                <Card key={section.href} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={section.href}>
                        Acessar
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 border-muted-foreground/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Settings className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle>Dicas de Uso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                • <strong>Posts do Blog:</strong> Suportam Markdown para formatação rica de texto
              </p>
              <p>
                • <strong>Podcasts:</strong> Aceita arquivos MP3 de até 500MB
              </p>
              <p>
                • <strong>Imagens:</strong> Use URLs do Firebase Storage ou faça upload durante a criação
              </p>
              {isAdmin() && (
                <p>
                  • <strong>Usuários:</strong> Apenas admins podem alterar roles de outros usuários
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}


