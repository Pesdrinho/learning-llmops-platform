import { useParams, useNavigate } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import Container from '@/components/layout/Container';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ArchitectureDiagram from '@/components/reactflow/ArchitectureDiagram';
import { getArquitetura } from '@/data/arquiteturas';
import { ArrowLeft, CheckCircle2, XCircle, Info } from 'lucide-react';

export default function ArquiteturaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const arquitetura = getArquitetura(id);

  if (!arquitetura) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Arquitetura não encontrada</h1>
          <Button onClick={() => navigate('/arquiteturas')} variant="outline">
            Voltar para galeria
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={`${arquitetura.nome} | Arquiteturas LLMOps`}
        description={arquitetura.descricao}
      />

      <Container className="py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => navigate('/arquiteturas')} className="gap-2 -ml-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para galeria
            </Button>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight">{arquitetura.nome}</h1>
              <p className="text-xl text-muted-foreground">{arquitetura.descricao}</p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="capitalize">
                  {arquitetura.nivel}
                </Badge>
                <Badge variant="secondary">Custo: {arquitetura.custoEstimado}</Badge>
                <Badge variant="secondary">Complexidade: {arquitetura.complexidade}</Badge>
                <Badge variant="secondary">Tempo: {arquitetura.tempoImplementacao}</Badge>
              </div>
            </div>
          </div>

          {/* Diagrama Interativo */}
          <Card>
            <CardHeader>
              <CardTitle>Diagrama Interativo</CardTitle>
              <p className="text-sm text-muted-foreground">
                Clique nos componentes para ver métricas, ferramentas, riscos e entregas
              </p>
            </CardHeader>
            <CardContent>
              <ReactFlowProvider>
                <ArchitectureDiagram arquitetura={arquitetura} />
              </ReactFlowProvider>
            </CardContent>
          </Card>

          {/* Casos de Uso */}
          <Card>
            <CardHeader>
              <CardTitle>Casos de Uso</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {arquitetura.casosDeUso.map((caso, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{caso}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pré-requisitos */}
          <Card>
            <CardHeader>
              <CardTitle>Pré-requisitos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Dados
                </h4>
                <p className="text-muted-foreground">{arquitetura.prerequisitos.dados}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Time
                </h4>
                <p className="text-muted-foreground">{arquitetura.prerequisitos.time}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Orçamento
                </h4>
                <p className="text-muted-foreground">{arquitetura.prerequisitos.orcamento}</p>
              </div>
            </CardContent>
          </Card>

          {/* Vantagens e Desvantagens */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200 dark:border-green-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  Vantagens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {arquitetura.vantagens.map((vantagem, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      <span>{vantagem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <XCircle className="h-5 w-5" />
                  Desvantagens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {arquitetura.desvantagens.map((desvantagem, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                      <span>{desvantagem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recursos Relacionados */}
          <Card>
            <CardHeader>
              <CardTitle>Recursos Relacionados</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="guias">
                  <AccordionTrigger>Guias e Documentação</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Confira nossos guias detalhados sobre implementação desta arquitetura.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/guia">Ver Guias</a>
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="blog">
                  <AccordionTrigger>Artigos e Case Studies</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Leia artigos técnicos e estudos de caso de implementação.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/blog">Ver Blog</a>
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="podcast">
                  <AccordionTrigger>Podcasts</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ouça discussões aprofundadas sobre esta arquitetura.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/podcast">Ver Podcasts</a>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}

