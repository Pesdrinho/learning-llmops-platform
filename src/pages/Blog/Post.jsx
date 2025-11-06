import { useParams, Link, Navigate } from 'react-router-dom';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import ReadingProgress from '@components/mdx/ReadingProgress';
import TableOfContents from '@components/mdx/TableOfContents';
import Callout from '@components/mdx/Callout';
import MarkdownContent from '@components/mdx/MarkdownContent';
import AudienceSection from '@components/AudienceSection';
import { formatDate } from '@lib/utils';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { getPostPorSlug } from '@data/blogPosts';

/**
 * Página de post individual do Blog
 */
export default function BlogPost() {
  const { slug } = useParams();

  // Busca post por slug
  const post = getPostPorSlug(slug);

  // Redireciona se post não existe
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Extrai headings do conteúdo (simplificado - idealmente seria parseado do MDX)
  const headings = [
    { id: 'introducao', text: 'Introdução', level: 2 },
    { id: 'conteudo-principal', text: 'Conteúdo Principal', level: 2 },
    { id: 'conclusao', text: 'Conclusão', level: 2 },
  ];

  return (
    <>
      <SEO title={post.title} description={post.summary} type="article" />
      <ReadingProgress />

      <article>
        {/* Header */}
        <div className="border-b bg-muted/30">
          <Container size="sm" className="py-12">
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao blog
              </Link>
            </Button>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold md:text-5xl">{post.title}</h1>
              <p className="text-xl text-muted-foreground">{post.summary}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Content */}
        <Container className="py-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_250px]">
            {/* Main Content */}
            <div className="mdx-content max-w-none space-y-8">
              {/* Imagem de capa (opcional) */}
              {post.image && (
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                </div>
              )}
              {/* Seção de Público-Alvo */}
              {post.audiencia && (
                <AudienceSection
                  publicoAlvo={post.audiencia.publicoAlvo}
                  objetivosAprendizado={post.audiencia.objetivosAprendizado}
                  tempoEstimado={post.audiencia.tempoEstimado}
                />
              )}

              {/* Conteúdo do Post renderizado com Markdown */}
              <MarkdownContent content={post.content} />

              <Callout type="success">
                Continue sua jornada explorando nosso{' '}
                <Link to="/guia" className="underline">
                  Guia de Macro-etapas
                </Link>{' '}
                para entender o framework completo.
              </Callout>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-20">
                <TableOfContents headings={headings} />
                
                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">Compartilhar</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Twitter</Button>
                    <Button variant="outline" size="sm">LinkedIn</Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </article>
    </>
  );
}
