import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Users, Target, Clock } from 'lucide-react';

/**
 * Componente reutilizável para apresentar público-alvo e objetivos de aprendizado
 * Usado em posts de blog, episódios de podcast e macro-etapas do guia
 */
export default function AudienceSection({ publicoAlvo, objetivosAprendizado, tempoEstimado }) {
  if (!publicoAlvo && !objetivosAprendizado && !tempoEstimado) {
    return null;
  }

  return (
    <Card className="border-primary/20 bg-gradient-subtle">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Para quem é este conteúdo?
        </CardTitle>
        <CardDescription>
          Saiba se este conteúdo é adequado para você e o que você irá aprender
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Público-alvo */}
        {publicoAlvo && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Users className="h-4 w-4 text-primary" />
              Público-Alvo
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{publicoAlvo}</p>
          </div>
        )}

        {/* Objetivos de aprendizado */}
        {objetivosAprendizado && objetivosAprendizado.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Target className="h-4 w-4 text-primary" />
              Ao final, você será capaz de:
            </div>
            <ul className="space-y-2">
              {objetivosAprendizado.map((objetivo, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1 flex-shrink-0">✓</span>
                  <span className="flex-1">{objetivo}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tempo estimado */}
        {tempoEstimado && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Tempo estimado: <Badge variant="secondary">{tempoEstimado}</Badge>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


