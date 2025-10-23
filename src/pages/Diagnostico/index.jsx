import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Container from '@/components/layout/Container';
import SEO from '@/components/SEO';
import { useDiagnosticos } from '@/hooks/useDiagnostico';
import { ClipboardList, Plus, ArrowRight, TrendingUp, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Diagnostico() {
  const navigate = useNavigate();
  const { diagnosticos, isLoading, criar, criando } = useDiagnosticos();

  const handleNovoDiagnostico = async () => {
    try {
      const id = await criar();
      navigate(`/diagnostico/${id}/formulario`);
    } catch (error) {
      console.error('Erro ao criar diagnóstico:', error);
    }
  };

  const diagnosticosEmAndamento = diagnosticos.filter((d) => d.status === 'em_andamento');
  const diagnosticosConcluidos = diagnosticos.filter((d) => d.status === 'concluido');

  return (
    <>
      <SEO
        title="Diagnóstico LLMOps"
        description="Avalie a maturidade da sua organização em LLMOps e receba recomendações personalizadas"
      />

      <Container className="py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Diagnóstico de Maturidade LLMOps
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Avalie o nível de maturidade da sua organização em LLMOps e receba recomendações
              personalizadas de arquiteturas e próximos passos.
            </p>
          </div>

          {/* CTA Novo Diagnóstico */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-semibold">Iniciar Novo Diagnóstico</h3>
                  <p className="text-muted-foreground">
                    Responda 7 etapas de perguntas e obtenha um relatório completo com
                    visualizações, scores e recomendações.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={handleNovoDiagnostico}
                  disabled={criando}
                  className="gap-2"
                >
                  <Plus className="h-5 w-5" />
                  {criando ? 'Criando...' : 'Começar Agora'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Como Funciona */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <ClipboardList className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Responda</CardTitle>
                <CardDescription>
                  Preencha questionário estruturado sobre descoberta, dados, arquitetura,
                  implementação, avaliação, deploy e governança.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. Analise</CardTitle>
                <CardDescription>
                  Visualize scores de maturidade por macro-etapa e níveis organizacionais (L1-L12)
                  em gráficos interativos.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Implemente</CardTitle>
                <CardDescription>
                  Receba recomendações de arquiteturas (RAG, Fine-tuning, Agentes) e próximos
                  passos priorizados.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Diagnósticos em Andamento */}
          {diagnosticosEmAndamento.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Em Andamento</h2>
              <div className="grid gap-4">
                {diagnosticosEmAndamento.map((diag) => (
                  <Card key={diag.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">Diagnóstico #{diag.id.slice(0, 8)}</h3>
                            <Badge variant="secondary">Em andamento</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Iniciado em{' '}
                            {diag.createdAt?.seconds
                              ? new Date(diag.createdAt.seconds * 1000).toLocaleDateString('pt-BR')
                              : 'Data desconhecida'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Etapa atual: {diag.etapaAtual} de 7
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/diagnostico/${diag.id}/formulario`)}
                          className="gap-2"
                        >
                          Continuar <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Diagnósticos Concluídos */}
          {diagnosticosConcluidos.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Concluídos</h2>
              <div className="grid gap-4">
                {diagnosticosConcluidos.map((diag) => (
                  <Card key={diag.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">Diagnóstico #{diag.id.slice(0, 8)}</h3>
                            <Badge>Concluído</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Concluído em{' '}
                            {diag.completedAt?.seconds
                              ? new Date(diag.completedAt.seconds * 1000).toLocaleDateString(
                                  'pt-BR'
                                )
                              : 'Data desconhecida'}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            Score geral: {diag.scores?.geral?.toFixed(1) || 'N/A'}/10
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/diagnostico/${diag.id}/resultado`)}
                          className="gap-2"
                        >
                          Ver Resultado <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Estado vazio */}
          {!isLoading && diagnosticos.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum diagnóstico ainda</h3>
                <p className="text-muted-foreground mb-6">
                  Comece seu primeiro diagnóstico para avaliar a maturidade LLMOps da sua
                  organização.
                </p>
                <Button onClick={handleNovoDiagnostico} disabled={criando} className="gap-2">
                  <Plus className="h-5 w-5" />
                  Criar Primeiro Diagnóstico
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </>
  );
}

