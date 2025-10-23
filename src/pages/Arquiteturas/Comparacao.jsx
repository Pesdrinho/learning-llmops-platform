import { useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import Container from '@/components/layout/Container';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ArchitectureDiagram from '@/components/reactflow/ArchitectureDiagram';
import { getArquitetura } from '@/data/arquiteturas';
import { ArrowLeft, CheckCircle2, XCircle, ArrowRightLeft } from 'lucide-react';

export default function ArquiteturaComparacao() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const arq1Id = searchParams.get('arq1');
  const arq2Id = searchParams.get('arq2');

  const arq1 = getArquitetura(arq1Id);
  const arq2 = getArquitetura(arq2Id);

  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });

  const handleViewportChange = useCallback((newViewport) => {
    setViewport(newViewport);
  }, []);

  if (!arq1 || !arq2) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Arquiteturas não encontradas</h1>
          <p className="text-muted-foreground mb-6">
            Selecione duas arquiteturas para comparar.
          </p>
          <Button onClick={() => navigate('/arquiteturas')} variant="outline">
            Voltar para galeria
          </Button>
        </div>
      </Container>
    );
  }

  const ComparisonRow = ({ label, value1, value2, highlight = false }) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b last:border-b-0">
      <div className="font-medium text-sm">{label}</div>
      <div
        className={`text-sm ${
          highlight && value1 !== value2 ? 'text-primary font-semibold' : ''
        }`}
      >
        {value1}
      </div>
      <div
        className={`text-sm ${
          highlight && value1 !== value2 ? 'text-primary font-semibold' : ''
        }`}
      >
        {value2}
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={`Comparação: ${arq1.nome} vs ${arq2.nome}`}
        description={`Compare as arquiteturas ${arq1.nome} e ${arq2.nome}`}
      />

      <Container className="py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => navigate('/arquiteturas')} className="gap-2 -ml-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para galeria
            </Button>

            <div className="flex items-center justify-center gap-4">
              <h1 className="text-2xl font-bold">{arq1.nome}</h1>
              <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
              <h1 className="text-2xl font-bold">{arq2.nome}</h1>
            </div>
          </div>

          {/* Tabela de Comparação Rápida */}
          <Card>
            <CardHeader>
              <CardTitle>Comparação Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 pb-3 border-b font-semibold text-sm">
                <div>Característica</div>
                <div className="text-center">{arq1.id}</div>
                <div className="text-center">{arq2.id}</div>
              </div>

              <ComparisonRow
                label="Nível"
                value1={<Badge className="capitalize">{arq1.nivel}</Badge>}
                value2={<Badge className="capitalize">{arq2.nivel}</Badge>}
                highlight
              />
              <ComparisonRow
                label="Custo Estimado"
                value1={arq1.custoEstimado}
                value2={arq2.custoEstimado}
                highlight
              />
              <ComparisonRow
                label="Complexidade"
                value1={arq1.complexidade}
                value2={arq2.complexidade}
                highlight
              />
              <ComparisonRow
                label="Tempo de Implementação"
                value1={arq1.tempoImplementacao}
                value2={arq2.tempoImplementacao}
                highlight
              />
              <ComparisonRow
                label="Componentes no Diagrama"
                value1={`${arq1.nodes.length} nós`}
                value2={`${arq2.nodes.length} nós`}
              />
            </CardContent>
          </Card>

          {/* Diagramas Lado a Lado */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{arq1.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactFlowProvider>
                  <ArchitectureDiagram arquitetura={arq1} />
                </ReactFlowProvider>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{arq2.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactFlowProvider>
                  <ArchitectureDiagram arquitetura={arq2} />
                </ReactFlowProvider>
              </CardContent>
            </Card>
          </div>

          {/* Vantagens e Desvantagens */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{arq1.nome}</h2>

              <Card className="border-green-200 dark:border-green-900">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Vantagens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {arq1.vantagens.map((v, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="inline-block w-1 h-1 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                        {v}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 dark:border-red-900">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-red-700 dark:text-red-400">
                    <XCircle className="h-4 w-4" />
                    Desvantagens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {arq1.desvantagens.map((d, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{arq2.nome}</h2>

              <Card className="border-green-200 dark:border-green-900">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Vantagens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {arq2.vantagens.map((v, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="inline-block w-1 h-1 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                        {v}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 dark:border-red-900">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-red-700 dark:text-red-400">
                    <XCircle className="h-4 w-4" />
                    Desvantagens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {arq2.desvantagens.map((d, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

