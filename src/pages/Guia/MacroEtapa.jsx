import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import Callout from '@components/mdx/Callout';
import AudienceSection from '@components/AudienceSection';
import GlossaryTooltip from '@components/GlossaryTooltip';
import ToolReference from '@components/ToolReference';
import ExternalContentSection from '@components/ExternalContentSection';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { getEtapaPorSlug } from '@data/guiaEtapas';

/**
 * Destaca termos do glossário no texto
 */
function highlightGlossaryTerms(text) {
  const glossaryTerms = [
    'LLMOps', 'RAG', 'Embedding', 'Fine-tuning', 'LoRA', 'QLoRA', 'PEFT',
    'Hallucination', 'Chunking', 'Vector Database', 'Prompt Engineering',
    'Token', 'Context Window', 'Agent', 'Observability', 'LGPD', 'GDPR'
  ];
  
  const parts = [];
  let lastIndex = 0;
  
  // Ordena termos por tamanho decrescente para evitar conflitos
  const sortedTerms = [...glossaryTerms].sort((a, b) => b.length - a.length);
  
  sortedTerms.forEach((term) => {
    const regex = new RegExp(`\\b(${term})\\b`, 'gi');
    const matches = [...text.matchAll(regex)];
    
    matches.forEach((match) => {
      const index = match.index;
      if (index >= lastIndex) {
        if (index > lastIndex) {
          parts.push(text.slice(lastIndex, index));
        }
        parts.push(
          <GlossaryTooltip key={`${term}-${index}`} term={match[1]}>
            {match[1]}
          </GlossaryTooltip>
        );
        lastIndex = index + match[1].length;
      }
    });
  });
  
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
}

/**
 * Página de macro-etapa individual
 * Suporta tanto rotas antigas (/guia/etapa) quanto novas (/guias/llmops/etapa)
 */
export default function MacroEtapa() {
  const { etapa, guiaSlug } = useParams();

  // Busca dados da etapa
  const macroEtapa = getEtapaPorSlug(etapa);

  // Redireciona se etapa não existe
  if (!macroEtapa) {
    const redirectPath = guiaSlug ? `/guias/${guiaSlug}` : '/guias';
    return <Navigate to={redirectPath} replace />;
  }

  // Define URLs base para navegação
  const baseUrl = guiaSlug ? `/guias/${guiaSlug}` : '/guia';
  const indexUrl = guiaSlug ? `/guias/${guiaSlug}` : '/guia';

  return (
    <>
      <SEO
        title={`${macroEtapa.titulo} - Guia LLMOps`}
        description={macroEtapa.descricao}
      />

      <div className="border-b bg-muted/30">
        <Container className="py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to={indexUrl}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao {guiaSlug ? 'guia' : 'índice'}
            </Link>
          </Button>

          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {macroEtapa.numero}
            </div>
            <div className="flex-1">
              <h1 className="mb-2 text-4xl font-bold">{macroEtapa.titulo}</h1>
              <p className="text-lg text-muted-foreground">{macroEtapa.descricao}</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Seção de Público-Alvo */}
          {macroEtapa.audiencia && (
            <AudienceSection
              publicoAlvo={macroEtapa.audiencia.publicoAlvo}
              objetivosAprendizado={macroEtapa.audiencia.objetivosAprendizado}
              tempoEstimado={macroEtapa.audiencia.tempoEstimado}
            />
          )}

          {/* Objetivos */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Objetivos desta Etapa
            </h2>
            <ul className="space-y-2">
              {macroEtapa.objetivos.map((objetivo, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="flex-1">
                    {highlightGlossaryTerms(objetivo)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Perguntas-Chave */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Perguntas-Chave para Decisão</h2>
            <Accordion type="single" collapsible className="w-full">
              {macroEtapa.perguntasChave.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.pergunta}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                      <p className="text-sm">{highlightGlossaryTerms(item.orientacao)}</p>
                      {item.ferramentas && item.ferramentas.length > 0 && (
                        <div className="pt-3 border-t">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">
                            Ferramentas que podem ajudar:
                          </p>
                          <div className="space-y-2">
                            {item.ferramentas.map((ferramenta, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <ToolReference 
                                  name={ferramenta.nome} 
                                  url={ferramenta.url}
                                  variant="outline"
                                />
                                <span className="text-xs text-muted-foreground">
                                  {ferramenta.funcionalidade}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Entregas */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Entregas Esperadas</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {macroEtapa.entregas.map((entrega) => (
                <Card key={entrega.nome}>
                  <CardHeader>
                    <CardTitle className="text-lg">{entrega.nome}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{entrega.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Níveis Organizacionais */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Níveis Organizacionais Relacionados</h2>
            <div className="space-y-3">
              {macroEtapa.niveisOrganizacionais.map((nivel) => (
                <div key={nivel.nivel} className="flex gap-3 rounded-lg border p-4">
                  <Badge className="h-fit">{nivel.nivel}</Badge>
                  <div>
                    <p className="font-medium">{nivel.nome}</p>
                    <p className="text-sm text-muted-foreground">{nivel.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Conteúdos Externos */}
          {macroEtapa.conteudosExternos && macroEtapa.conteudosExternos.length > 0 && (
            <ExternalContentSection contents={macroEtapa.conteudosExternos} />
          )}

          {/* Call to Action */}
          {macroEtapa.proximaEtapa && (
            <Callout type="tip" title="Próxima Etapa">
              Após concluir as entregas desta etapa, avance para:{' '}
              <Link to={`${baseUrl}/${macroEtapa.proximaEtapa.slug}`} className="font-semibold underline">
                {macroEtapa.proximaEtapa.titulo}
              </Link>
            </Callout>
          )}

          {/* Navegação */}
          <div className="flex justify-between pt-8 border-t">
            <Button asChild variant="outline">
              <Link to={indexUrl}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao índice
              </Link>
            </Button>
            {macroEtapa.proximaEtapa && (
              <Button asChild>
                <Link to={`${baseUrl}/${macroEtapa.proximaEtapa.slug}`}>
                  Próxima etapa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            {!macroEtapa.proximaEtapa && (
              <Button asChild variant="default">
                <Link to={indexUrl}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Concluir guia
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}




