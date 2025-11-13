import { Badge } from '@components/ui/badge';
import { ExternalLink } from 'lucide-react';

/**
 * Componente para exibir referência de ferramenta inline
 * @param {string} name - Nome da ferramenta
 * @param {string} url - URL da ferramenta (opcional)
 * @param {string} variant - Variante do badge (default, secondary, outline)
 */
export default function ToolReference({ name, url, variant = 'secondary' }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 no-underline hover:opacity-80 transition-opacity"
      >
        <Badge variant={variant} className="text-xs">
          {name}
        </Badge>
        <ExternalLink className="h-3 w-3 text-muted-foreground" />
      </a>
    );
  }

  return (
    <Badge variant={variant} className="text-xs">
      {name}
    </Badge>
  );
}

