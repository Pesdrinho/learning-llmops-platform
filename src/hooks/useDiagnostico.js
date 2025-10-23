import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import {
  getDiagnostico,
  listarDiagnosticos,
  criarDiagnostico,
  updateDiagnostico,
  salvarRespostasEtapa,
  finalizarDiagnostico,
  deletarDiagnostico,
} from '@/lib/firestore/diagnosticoService';
import { calcularScores } from '@/lib/diagnostico/scoringEngine';
import { gerarRecomendacoes } from '@/lib/diagnostico/recommendationEngine';

/**
 * Hook para gerenciar diagnóstico individual
 */
export function useDiagnostico(diagnosticoId) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Buscar diagnóstico
  const {
    data: diagnostico,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['diagnostico', diagnosticoId],
    queryFn: () => getDiagnostico(diagnosticoId),
    enabled: !!user && !!diagnosticoId,
  });

  // Salvar resposta de etapa
  const { mutate: salvarResposta, isPending: salvando } = useMutation({
    mutationFn: ({ etapa, respostas }) => salvarRespostasEtapa(diagnosticoId, etapa, respostas),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnostico', diagnosticoId] });
    },
  });

  // Atualizar diagnóstico genérico
  const { mutate: atualizar, isPending: atualizando } = useMutation({
    mutationFn: (dados) => updateDiagnostico(diagnosticoId, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnostico', diagnosticoId] });
    },
  });

  // Finalizar diagnóstico
  const { mutate: finalizar, isPending: finalizando } = useMutation({
    mutationFn: async () => {
      if (!diagnostico) throw new Error('Diagnóstico não encontrado');

      const scores = calcularScores(diagnostico.respostas);
      const recomendacoes = gerarRecomendacoes({ ...diagnostico, scores });

      return finalizarDiagnostico(diagnosticoId, scores, recomendacoes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnostico', diagnosticoId] });
      queryClient.invalidateQueries({ queryKey: ['diagnosticos'] });
    },
  });

  return {
    diagnostico,
    isLoading,
    error,
    salvarResposta,
    salvando,
    atualizar,
    atualizando,
    finalizar,
    finalizando,
  };
}

/**
 * Hook para listar diagnósticos do usuário
 */
export function useDiagnosticos() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Listar diagnósticos
  const {
    data: diagnosticos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['diagnosticos', user?.uid],
    queryFn: () => listarDiagnosticos(user.uid),
    enabled: !!user,
  });

  // Criar novo diagnóstico
  const { mutateAsync: criar, isPending: criando } = useMutation({
    mutationFn: (dadosIniciais) => criarDiagnostico(user.uid, dadosIniciais),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnosticos'] });
    },
  });

  // Deletar diagnóstico
  const { mutate: deletar, isPending: deletando } = useMutation({
    mutationFn: deletarDiagnostico,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnosticos'] });
    },
  });

  return {
    diagnosticos,
    isLoading,
    error,
    criar,
    criando,
    deletar,
    deletando,
  };
}

