/**
 * Motor de pontuação para diagnóstico LLMOps
 */

import { ETAPAS, PERGUNTAS } from './questions';

/**
 * Calcula score de uma pergunta individual
 */
function calcularScorePergunta(pergunta, resposta) {
  if (!resposta) return 0;

  const peso = pergunta.peso || 1;

  switch (pergunta.tipo) {
    case 'escala':
      // Normaliza escala para 0-10
      return (resposta / pergunta.max) * 10 * peso;

    case 'radio':
      // Encontra o peso da opção selecionada
      const opcao = pergunta.opcoes?.find((opt) => opt.valor === resposta);
      return (opcao?.peso || 0.5) * 10 * peso;

    case 'checkbox':
      // Média dos itens selecionados
      if (!Array.isArray(resposta)) return 0;
      const totalSelecionados = resposta.length;
      const totalOpcoes = pergunta.opcoes?.length || 1;
      return (totalSelecionados / totalOpcoes) * 10 * peso;

    case 'textarea':
      // Se preencheu, considera score máximo
      return resposta.trim().length > 10 ? 10 * peso : 0;

    default:
      return 0;
  }
}

/**
 * Calcula score de uma etapa
 */
export function calcularScoreEtapa(nomeEtapa, respostas) {
  const configEtapa = PERGUNTAS[nomeEtapa];
  if (!configEtapa || !respostas) return 0;

  const perguntas = configEtapa.perguntas;
  let somaScores = 0;
  let somaPesos = 0;

  perguntas.forEach((pergunta) => {
    const resposta = respostas[pergunta.id];
    const score = calcularScorePergunta(pergunta, resposta);
    const peso = pergunta.peso || 1;

    somaScores += score;
    somaPesos += 10 * peso; // Score máximo possível
  });

  return somaPesos > 0 ? (somaScores / somaPesos) * 10 : 0;
}

/**
 * Mapeamento de perguntas para níveis organizacionais (L1-L12)
 */
const MAPA_NIVEL_PERGUNTAS = {
  L1: ['descoberta.stakeholders', 'descoberta.maturidade_ia'],
  L2: ['governanca.requisitos_regulatorios', 'governanca.bias_fairness'],
  L3: ['descoberta.objetivo_negocio', 'avaliacao.metricas_sucesso'],
  L4: ['implementacao.time_tecnico', 'implementacao.infra_existente'],
  L5: ['dados.tem_dados', 'dados.qualidade_dados'],
  L6: ['arquitetura.domain_specific', 'arquitetura.necessidade_contexto'],
  L7: ['implementacao.preferencia_llm', 'arquitetura.complexidade_tasks'],
  L8: ['avaliacao.golden_dataset', 'avaliacao.processo_avaliacao'],
  L9: ['deploy.estrategia_deploy', 'deploy.monitoramento'],
  L10: ['arquitetura.latencia', 'arquitetura.escalabilidade'],
  L11: ['governanca.processo_melhoria', 'deploy.rollback'],
  L12: ['implementacao.orcamento', 'dados.atualizacao_dados'],
};

/**
 * Calcula score por nível organizacional
 */
export function calcularScoreNivel(nivel, todasRespostas) {
  const perguntasRelevantes = MAPA_NIVEL_PERGUNTAS[nivel] || [];

  if (perguntasRelevantes.length === 0) return 0;

  let somaScores = 0;
  let contagem = 0;

  perguntasRelevantes.forEach((caminho) => {
    const [etapa, perguntaId] = caminho.split('.');
    const configEtapa = PERGUNTAS[etapa];
    const pergunta = configEtapa?.perguntas.find((p) => p.id === perguntaId);
    const resposta = todasRespostas[etapa]?.[perguntaId];

    if (pergunta && resposta !== undefined) {
      somaScores += calcularScorePergunta(pergunta, resposta);
      contagem++;
    }
  });

  return contagem > 0 ? somaScores / contagem : 0;
}

/**
 * Calcula todos os scores (etapas, níveis e geral)
 */
export function calcularScores(todasRespostas) {
  const scoresPorEtapa = {};
  const scoresPorNivel = {};

  // Scores por etapa
  ETAPAS.forEach((etapa) => {
    const respostas = todasRespostas[etapa.id];
    scoresPorEtapa[etapa.id] = calcularScoreEtapa(etapa.id, respostas);
  });

  // Scores por nível organizacional
  Object.keys(MAPA_NIVEL_PERGUNTAS).forEach((nivel) => {
    scoresPorNivel[nivel] = calcularScoreNivel(nivel, todasRespostas);
  });

  // Score geral (média das etapas)
  const scoresEtapas = Object.values(scoresPorEtapa);
  const scoreGeral =
    scoresEtapas.length > 0
      ? scoresEtapas.reduce((acc, score) => acc + score, 0) / scoresEtapas.length
      : 0;

  return {
    porEtapa: scoresPorEtapa,
    porNivel: scoresPorNivel,
    geral: scoreGeral,
  };
}

