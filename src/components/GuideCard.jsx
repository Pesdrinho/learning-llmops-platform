import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, ArrowRight, Users, AlertCircle } from 'lucide-react';

/**
 * Card para exibir guia no hub
 * @param {Object} guia - Dados do guia
 */
export default function GuideCard({ guia }) {
  const statusConfig = {
    completo: {
      variant: 'default',
      label: 'Completo',
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    },
    em_desenvolvimento: {
      variant: 'secondary',
      label: 'Em Desenvolvimento',
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    },
    planejado: {
      variant: 'outline',
      label: 'Planejado',
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    },
  };

  const status = statusConfig[guia.status] || statusConfig.planejado;
  const isDisponivel = guia.status === 'completo';

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={status.color}>
            {status.label}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {guia.tempoEstimado}
          </span>
        </div>
        <CardTitle className="text-xl">{guia.titulo}</CardTitle>
        <CardDescription className="text-sm">{guia.subtitulo}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{guia.descricao}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {guia.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Info adicional */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="h-3 w-3" />
            <span>{guia.categoria}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-3 w-3" />
            <span>Nível: {guia.nivel}</span>
          </div>
        </div>

        {/* Mensagem de desenvolvimento */}
        {!isDisponivel && guia.mensagemDesenvolvimento && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs">
            <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{guia.mensagemDesenvolvimento}</p>
          </div>
        )}

        {/* Botão de ação */}
        <div className="mt-auto pt-4">
          {isDisponivel ? (
            <Button asChild className="w-full">
              <Link to={`/guias/${guia.slug}`}>
                Explorar guia
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="w-full" disabled>
              Em breve
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

