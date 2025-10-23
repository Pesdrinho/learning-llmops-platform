import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDiagnostico } from '@/hooks/useDiagnostico';
import { ETAPAS, PERGUNTAS } from '@/lib/diagnostico/questions';
import Container from '@/components/layout/Container';
import SEO from '@/components/SEO';
import FormProgress from '@/components/forms/FormProgress';
import FormNavigation from '@/components/forms/FormNavigation';
import EtapaFormulario from '@/components/diagnostico/EtapaFormulario';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Formulario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { diagnostico, isLoading, salvarResposta, finalizar, finalizando } = useDiagnostico(id);

  const [etapaAtual, setEtapaAtual] = useState(1);

  useEffect(() => {
    if (diagnostico) {
      setEtapaAtual(diagnostico.etapaAtual || 1);
    }
  }, [diagnostico]);

  if (isLoading) {
    return (
      <Container className="py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full" />
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
          <button
            onClick={() => navigate('/diagnostico')}
            className="text-primary hover:underline"
          >
            Voltar para diagnósticos
          </button>
        </div>
      </Container>
    );
  }

  const etapaConfig = ETAPAS[etapaAtual - 1];
  const configFormulario = PERGUNTAS[etapaConfig.id];
  const respostasEtapa = diagnostico.respostas?.[etapaConfig.id] || {};

  const handleProxima = async (respostas) => {
    try {
      // Salvar respostas da etapa atual
      await salvarResposta({
        etapa: etapaConfig.id,
        respostas,
      });

      // Se é a última etapa, finalizar e ir para resultado
      if (etapaAtual === ETAPAS.length) {
        await finalizar();
        navigate(`/diagnostico/${id}/resultado`);
      } else {
        // Senão, avançar para próxima etapa
        setEtapaAtual((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Erro ao salvar etapa:', error);
    }
  };

  const handleVoltar = () => {
    if (etapaAtual > 1) {
      setEtapaAtual((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/diagnostico');
    }
  };

  return (
    <>
      <SEO
        title={`Diagnóstico - ${configFormulario.titulo}`}
        description="Complete o diagnóstico LLMOps para sua organização"
      />

      <Container className="py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Progresso */}
          <FormProgress atual={etapaAtual} total={ETAPAS.length} />

          {/* Formulário da etapa */}
          <Card className="p-6">
            <EtapaFormulario
              configEtapa={configFormulario}
              respostasIniciais={respostasEtapa}
              onSubmit={handleProxima}
            />
          </Card>

          {/* Navegação */}
          <FormNavigation
            onBack={handleVoltar}
            onNext={() => {
              // Trigger submit do formulário
              const form = document.querySelector('form');
              if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              }
            }}
            canGoBack={true}
            canGoNext={true}
            isLastStep={etapaAtual === ETAPAS.length}
            isSubmitting={finalizando}
          />
        </div>
      </Container>
    </>
  );
}

