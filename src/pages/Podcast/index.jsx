import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import { formatDate } from '@lib/utils';
import { Calendar, Clock, Play, Headphones } from 'lucide-react';

/**
 * Página de lista de episódios do Podcast
 */
export default function Podcast() {
  // Mock data
  const episodes = [
    {
      slug: 'ep01-fundamentos-llmops',
      numero: 1,
      titulo: 'Fundamentos de LLMOps: Por onde começar?',
      descricao:
        'Uma conversa introdutória sobre LLMOps, diferenças para MLOps tradicional e os principais desafios ao implementar sistemas LLM em produção.',
      data: '2025-01-20',
      duracao: '45:30',
      temas: ['fundamentos', 'introdução', 'mlops'],
      convidado: 'Dr. João Silva',
      thumbnail: '/images/podcast/ep01.jpg',
    },
    {
      slug: 'ep02-rag-profundidade',
      numero: 2,
      titulo: 'RAG em Profundidade: Da Teoria à Prática',
      descricao:
        'Exploramos Retrieval-Augmented Generation, desde conceitos básicos até implementações avançadas, incluindo embedding models, vector databases e estratégias de chunking.',
      data: '2025-01-13',
      duracao: '52:15',
      temas: ['rag', 'arquitetura', 'embeddings'],
      convidado: 'Maria Santos',
      thumbnail: '/images/podcast/ep02.jpg',
    },
    {
      slug: 'ep03-metricas-avaliacao',
      numero: 3,
      titulo: 'Métricas e Avaliação: Como medir qualidade de LLMs',
      descricao:
        'Discutimos métricas essenciais para sistemas LLM: recall@k, faithfulness, relevância, latência e custo. Quando usar cada uma e como estabelecer baselines.',
      data: '2025-01-06',
      duracao: '38:45',
      temas: ['métricas', 'avaliação', 'monitoramento'],
      convidado: 'Pedro Oliveira',
      thumbnail: '/images/podcast/ep03.jpg',
    },
  ];

  return (
    <>
      <SEO
        title="Podcast"
        description="Conversas com especialistas sobre LLMOps, arquiteturas e o futuro da IA"
        type="website"
      />

      <div className="border-b bg-muted/30">
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Headphones className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold">Podcast LLMOps</h1>
            <p className="text-lg text-muted-foreground">
              Conversas com especialistas, casos reais e insights sobre arquiteturas, boas práticas
              e o futuro de sistemas baseados em LLM
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Último episódio (Featured) */}
        {episodes[0] && (
          <Card className="mb-12 overflow-hidden border-2 border-primary/20">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="aspect-video md:aspect-square overflow-hidden bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  [Thumbnail do Episódio]
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 md:pr-12">
                <Badge className="mb-3 w-fit">Último episódio</Badge>
                <h2 className="mb-2 text-3xl font-bold">
                  #{episodes[0].numero}: {episodes[0].titulo}
                </h2>
                <p className="mb-4 text-muted-foreground">{episodes[0].descricao}</p>
                <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(episodes[0].data)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {episodes[0].duracao}
                  </div>
                </div>
                <Button asChild size="lg" className="w-fit">
                  <Link to={`/podcast/${episodes[0].slug}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Ouvir agora
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Lista de todos os episódios */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Todos os Episódios</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <Card key={episode.slug} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-video overflow-hidden bg-muted">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    [Thumbnail]
                  </div>
                </div>
                <CardHeader className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline">Ep. {episode.numero}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{episode.titulo}</CardTitle>
                  <CardDescription className="line-clamp-3 text-sm">
                    {episode.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(episode.data, { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {episode.duracao}
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/podcast/${episode.slug}`}>
                      <Play className="mr-2 h-4 w-4" />
                      Ouvir episódio
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sobre o Podcast */}
        <Card className="mt-12 bg-muted/50">
          <CardHeader>
            <CardTitle>Sobre o Podcast</CardTitle>
          </CardHeader>
          <CardContent className="max-w-none">
            <p>
              O Podcast LLMOps traz conversas com especialistas, engenheiros e líderes sobre
              implementação prática de sistemas baseados em LLM. Cada episódio explora desafios
              reais, decisões arquiteturais e lições aprendidas.
            </p>
            <p className="text-sm text-muted-foreground mb-0">
              Novo episódio toda semana • Disponível em todas as plataformas
            </p>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}



