import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import { ArrowLeft, CheckCircle, Clock, BookOpen, Users, ArrowRight } from 'lucide-react';
import { getGuiaPorSlug } from '@data/guiasCatalogo';

/**
 * Página de visualização de um guia específico
 * Mostra o índice de etapas do guia
 */
export default function GuideView() {
  const { guiaSlug } = useParams();
  const guia = getGuiaPorSlug(guiaSlug);

  // Redireciona se guia não existe
  if (!guia) {
    return <Navigate to="/guias" replace />;
  }

  // Se o guia não está completo, redireciona para o hub
  if (guia.status !== 'completo') {
    return <Navigate to="/guias" replace />;
  }

  return (
    <>
      <SEO
        title={`${guia.titulo} - Guias`}
        description={guia.descricao}
        type="website"
      />

      {/* Header */}
      <div className="border-b bg-muted/30">
        <Container className="py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/guias">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao hub
            </Link>
          </Button>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge>{guia.categoria}</Badge>
              <Badge variant="outline">{guia.nivel}</Badge>
            </div>
            <h1 className="text-4xl font-bold">{guia.titulo}</h1>
            <p className="text-lg text-muted-foreground">{guia.subtitulo}</p>

            {/* Metadados */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{guia.tempoEstimado}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{guia.etapas.length} etapas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{guia.autor}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Descrição */}
          <section>
            <p className="text-lg">{guia.descricao}</p>
          </section>

          {/* Objetivos */}
          {guia.objetivos && guia.objetivos.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                O que você vai aprender
              </h2>
              <ul className="space-y-2">
                {guia.objetivos.map((objetivo, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span className="flex-1">{objetivo}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Pré-requisitos */}
          {guia.prerequisitos && guia.prerequisitos.length > 0 && (
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Pré-requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {guia.prerequisitos.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Índice de Etapas */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold">Etapas do Guia</h2>
            <div className="space-y-4">
              {guia.etapas.map((etapa) => (
                <Card
                  key={etapa.slug}
                  className="overflow-hidden transition-all hover:shadow-lg"
                >
                  <CardHeader className="bg-muted/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                          {etapa.numero}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{etapa.titulo}</CardTitle>
                          <CardDescription className="mt-1">
                            {etapa.descricao}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {etapa.audiencia?.tempoEstimado && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {etapa.audiencia.tempoEstimado}
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/guias/${guiaSlug}/${etapa.slug}`}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Explorar etapa
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Navegação */}
          <div className="flex justify-between pt-8 border-t">
            <Button asChild variant="outline">
              <Link to="/guias">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao hub
              </Link>
            </Button>
            {guia.etapas.length > 0 && (
              <Button asChild>
                <Link to={`/guias/${guiaSlug}/${guia.etapas[0].slug}`}>
                  Começar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

