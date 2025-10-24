import { useParams, Link } from 'react-router-dom';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import AudioPlayer from '@components/media/AudioPlayer';
import Transcript from '@components/media/Transcript';
import AudienceSection from '@components/AudienceSection';
import { formatDate } from '@lib/utils';
import { Calendar, Clock, User, ArrowLeft, ExternalLink } from 'lucide-react';

/**
 * Página de episódio individual do Podcast
 */
export default function Episode() {
  const { slug } = useParams();
  
  // Feature flag para transcrição (mantida para ativação futura)
  const showTranscript = false;

  // Mock data
  const episode = {
    numero: 1,
    titulo: 'Fundamentos de LLMOps: Por onde começar?',
    descricao:
      'Uma conversa introdutória sobre LLMOps, diferenças para MLOps tradicional e os principais desafios ao implementar sistemas LLM em produção.',
    data: '2025-01-20',
    duracao: '45:30',
    temas: ['fundamentos', 'introdução', 'mlops'],
    convidado: {
      nome: 'Dr. João Silva',
      cargo: 'Principal ML Engineer',
      empresa: 'TechCorp',
      linkedin: 'https://linkedin.com',
    },
    audioUrl: 'https://example.com/podcast/ep01.mp3', // Placeholder
    audiencia: {
      publicoAlvo: 'Engenheiros de software, cientistas de dados e profissionais transitando para área de IA/ML',
      objetivosAprendizado: [
        'Compreender os fundamentos de LLMOps',
        'Identificar diferenças entre MLOps tradicional e LLMOps',
        'Reconhecer principais desafios em produção',
        'Conhecer primeiros passos práticos para começar',
      ],
      tempoEstimado: '45 min',
    },
    notas: [
      {
        tempo: '00:00',
        descricao: 'Introdução e apresentação do convidado',
      },
      {
        tempo: '05:30',
        descricao: 'O que é LLMOps e por que é importante',
      },
      {
        tempo: '15:20',
        descricao: 'Diferenças entre MLOps e LLMOps',
      },
      {
        tempo: '25:40',
        descricao: 'Principais desafios em produção',
      },
      {
        tempo: '35:15',
        descricao: 'Recomendações e por onde começar',
      },
      {
        tempo: '42:00',
        descricao: 'Perguntas da comunidade',
      },
    ],
    recursosRelacionados: [
      {
        titulo: 'Guia: Descoberta & Definição',
        link: '/guia/descoberta',
        tipo: 'Guia',
      },
      {
        titulo: 'Blog: Introdução ao LLMOps',
        link: '/blog/introducao-llmops',
        tipo: 'Artigo',
      },
    ],
  };

  const transcriptContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.

    [Conteúdo completo da transcrição seria carregado aqui]
  `;

  return (
    <>
      <SEO
        title={`Ep. ${episode.numero}: ${episode.titulo}`}
        description={episode.descricao}
        type="article"
      />

      {/* Header */}
      <div className="border-b bg-muted/30">
        <Container className="py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/podcast">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos episódios
            </Link>
          </Button>

          <div className="space-y-4">
            <Badge>Episódio {episode.numero}</Badge>
            <h1 className="text-4xl font-bold md:text-5xl">{episode.titulo}</h1>
            <p className="text-xl text-muted-foreground">{episode.descricao}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(episode.data)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {episode.duracao}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {episode.convidado.nome}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {episode.temas.map((tema) => (
                <Badge key={tema} variant="secondary">
                  {tema}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Seção de Público-Alvo */}
            {episode.audiencia && (
              <AudienceSection
                publicoAlvo={episode.audiencia.publicoAlvo}
                objetivosAprendizado={episode.audiencia.objetivosAprendizado}
                tempoEstimado={episode.audiencia.tempoEstimado}
              />
            )}

            {/* Audio Player */}
            <AudioPlayer
              src={episode.audioUrl}
              title={episode.titulo}
              artist={`Com ${episode.convidado.nome}`}
            />

            {/* Notas do Episódio */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold">Notas do Episódio</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {episode.notas.map((nota, index) => (
                      <div key={index} className="flex gap-4">
                        <Badge variant="outline" className="h-fit font-mono">
                          {nota.tempo}
                        </Badge>
                        <p className="flex-1 text-sm">{nota.descricao}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Transcrição (oculta por padrão, pode ser ativada alterando showTranscript) */}
            {showTranscript && (
              <section>
                <Transcript content={transcriptContent} />
              </section>
            )}

            {/* Recursos Relacionados */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold">Recursos Relacionados</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {episode.recursosRelacionados.map((recurso, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Badge variant="outline" className="w-fit">
                        {recurso.tipo}
                      </Badge>
                      <CardTitle className="text-lg">{recurso.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="ghost" size="sm" className="w-full">
                        <Link to={recurso.link}>
                          Acessar
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-20 space-y-6">
              {/* Convidado */}
              <Card>
                <CardHeader>
                  <CardTitle>Convidado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold">{episode.convidado.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {episode.convidado.cargo} • {episode.convidado.empresa}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a
                      href={episode.convidado.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Conectar no LinkedIn
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Plataformas */}
              <Card>
                <CardHeader>
                  <CardTitle>Ouvir em</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Spotify
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Apple Podcasts
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Google Podcasts
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    RSS Feed
                  </Button>
                </CardContent>
              </Card>

              {/* Compartilhar */}
              <Card>
                <CardHeader>
                  <CardTitle>Compartilhar</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    Copiar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}




