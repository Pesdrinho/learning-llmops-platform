import { Link } from 'react-router-dom';
import { Button } from '@components/ui/button';
import SEO from '@components/SEO';
import { Home, ArrowLeft } from 'lucide-react';

/**
 * Página 404 - Não Encontrado
 */
export default function NotFound() {
  return (
    <>
      <SEO title="Página não encontrada" />
      <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center p-4">
        <div className="text-center">
          <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
          <h2 className="mb-4 text-3xl font-semibold">Página não encontrada</h2>
          <p className="mb-8 text-muted-foreground">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Voltar para Home
              </Link>
            </Button>
            <Button asChild variant="outline" onClick={() => window.history.back()}>
              <span className="cursor-pointer">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}





