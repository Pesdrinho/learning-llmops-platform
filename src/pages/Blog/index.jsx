import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import { formatDate } from '@lib/utils';
import { Calendar, Clock } from 'lucide-react';
import { getPostsOrdenados, getTodasTags } from '@data/blogPosts';

/**
 * Página de lista de posts do Blog
 */
export default function Blog() {
  const posts = getPostsOrdenados();
  const todasTags = getTodasTags();

  return (
    <>
      <SEO
        title="Blog"
        description="Artigos técnicos, tutoriais e cases sobre LLMOps"
        type="website"
      />

      <div className="border-b bg-muted/30">
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold">Blog LLMOps</h1>
            <p className="text-lg text-muted-foreground">
              Artigos técnicos, tutoriais e insights sobre arquiteturas, boas práticas e o futuro
              de LLMOps
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Posts Grid */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {posts.map((post) => (
                <Card key={post.slug} className="overflow-hidden transition-shadow hover:shadow-lg">
                  {post.image && (
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        [Imagem do Post]
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl">
                      <Link to={`/blog/${post.slug}`} className="hover:text-primary">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="mt-2 text-base">{post.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readingTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tags Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {todasTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sobre o Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Publicamos regularmente artigos técnicos, tutoriais práticos e análises
                  aprofundadas sobre LLMOps, arquiteturas de LLM e boas práticas da indústria.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}




