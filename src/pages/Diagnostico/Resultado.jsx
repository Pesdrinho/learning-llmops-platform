import { useParams, useNavigate } from 'react-router-dom';
import { useDiagnostico } from '@/hooks/useDiagnostico';
import Container from '@/components/layout/Container';
import SEO from '@/components/SEO';
import ResultadoVisual from '@/components/diagnostico/ResultadoVisual';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Home } from 'lucide-react';

export default function Resultado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { diagnostico, isLoading } = useDiagnostico(id);

  if (isLoading) {
    return (
      <Container className="py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Container>
    );
  }

  if (!diagnostico) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Diagnóstico não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O diagnóstico que você está procurando não existe ou foi removido.
          </p>
          <Button onClick={() => navigate('/diagnostico')} variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Voltar para diagnósticos
          </Button>
        </div>
      </Container>
    );
  }

  if (diagnostico.status !== 'concluido') {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Diagnóstico não concluído</h1>
          <p className="text-muted-foreground mb-6">
            Este diagnóstico ainda não foi finalizado. Complete todas as etapas para ver o
            resultado.
          </p>
          <Button
            onClick={() => navigate(`/diagnostico/${id}/formulario`)}
            className="gap-2"
          >
            Continuar diagnóstico
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title="Resultado do Diagnóstico LLMOps"
        description="Veja os resultados do seu diagnóstico de maturidade LLMOps"
      />

      <Container className="py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/diagnostico')}
              className="gap-2 -ml-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para diagnósticos
            </Button>

            <div>
              <h1 className="text-4xl font-bold tracking-tight">Resultado do Diagnóstico</h1>
              <p className="text-muted-foreground mt-2">
                Concluído em{' '}
                {diagnostico.completedAt?.seconds
                  ? new Date(diagnostico.completedAt.seconds * 1000).toLocaleString('pt-BR')
                  : 'Data desconhecida'}
              </p>
            </div>
          </div>

          {/* Visualizações */}
          <ResultadoVisual diagnostico={diagnostico} />
        </div>
      </Container>
    </>
  );
}

