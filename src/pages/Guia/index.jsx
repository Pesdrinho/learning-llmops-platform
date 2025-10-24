import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { getTodasEtapas } from '@data/guiaEtapas';

/**
 * Página de índice do Guia de Macro-etapas
 */
export default function Guia() {
  const macroEtapas = getTodasEtapas();

  return (
    <>
      <SEO
        title="Guia de Macro-etapas LLMOps"
        description="Framework estratégico completo para planejar e implementar sistemas LLMOps"
        type="website"
      />

      <div className="border-b bg-muted/30">
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">Framework Estratégico</Badge>
            <h1 className="mb-4 text-4xl font-bold">Guia de Macro-etapas LLMOps</h1>
            <p className="text-lg text-muted-foreground">
              Um framework completo que mapeia decisões, métricas, governança e gates por etapa do
              ciclo de vida de sistemas LLM
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Introdução */}
        <div className="mx-auto mb-16 max-w-3xl">
          <h2>Como usar este guia</h2>
          <p>
            Este guia organiza o desenvolvimento de sistemas LLMOps em 7 macro-etapas sequenciais.
            Cada etapa contém:
          </p>
          <ul>
            <li>
              <strong>Objetivos claros:</strong> O que você precisa alcançar
            </li>
            <li>
              <strong>Decisões-chave:</strong> Perguntas que guiam escolhas arquiteturais
            </li>
            <li>
              <strong>Entregáveis:</strong> Artefatos concretos que marcam conclusão
            </li>
            <li>
              <strong>Níveis organizacionais (L1-L12):</strong> Mapeamento de maturidade e
              capacidades
            </li>
          </ul>
        </div>

        {/* Grid de Etapas */}
        <div className="space-y-6">
          {macroEtapas.map((etapa) => (
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
                      <CardTitle className="text-2xl">{etapa.titulo}</CardTitle>
                      <CardDescription className="mt-1 text-base">
                        {etapa.descricao}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Principais Entregas
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {etapa.entregas.map((entrega) => (
                        <li key={entrega.nome} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {entrega.nome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Níveis Organizacionais</h4>
                    <div className="flex flex-wrap gap-2">
                      {etapa.niveisOrganizacionais.map((nivel) => (
                        <Badge key={nivel.nivel} variant="outline">
                          {nivel.nivel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  to={`/guia/${etapa.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Explorar etapa completa
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}



