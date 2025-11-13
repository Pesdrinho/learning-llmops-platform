import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { ExternalLink, Youtube, FileText, BookOpen } from 'lucide-react';

/**
 * Tipos de conteúdo externo
 */
const contentTypeConfig = {
  youtube: {
    icon: Youtube,
    label: 'Vídeo',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
  article: {
    icon: FileText,
    label: 'Artigo',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  paper: {
    icon: BookOpen,
    label: 'Paper',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  },
};

/**
 * Componente para exibir card de conteúdo externo
 * @param {string} type - Tipo do conteúdo (youtube, article, paper)
 * @param {string} title - Título do conteúdo
 * @param {string} description - Descrição breve
 * @param {string} author - Autor ou canal
 * @param {string} url - URL do conteúdo
 * @param {string} duration - Duração (para vídeos) ou tempo de leitura
 * @param {string[]} tags - Tags do conteúdo (opcional)
 */
export default function ExternalContent({ 
  type, 
  title, 
  description, 
  author, 
  url, 
  duration, 
  tags = [] 
}) {
  const config = contentTypeConfig[type] || contentTypeConfig.article;
  const Icon = config.icon;

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={config.color}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
          {duration && (
            <span className="text-xs text-muted-foreground">{duration}</span>
          )}
        </div>
        <CardTitle className="text-base leading-tight">{title}</CardTitle>
        {author && (
          <CardDescription className="text-xs">{author}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Button asChild size="sm" variant="outline" className="w-full">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            Acessar conteúdo
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

