/**
 * Motor de recomendações para diagnóstico LLMOps
 */

/**
 * Determina arquiteturas recomendadas baseado nas respostas
 */
function determinarArquiteturas(scores, respostas) {
  const regras = [
    {
      id: 'rag',
      nome: 'RAG - Retrieval-Augmented Generation',
      condicao: () => {
        const necessidadeContexto =
          respostas.arquitetura?.necessidade_contexto === 'sim_critico' ||
          respostas.arquitetura?.necessidade_contexto === 'sim_desejavel';
        const temDados = respostas.dados?.tem_dados !== 'nao';
        return necessidadeContexto && temDados;
      },
      prioridade: 1,
      motivo:
        'Você possui dados proprietários e precisa de contexto específico para as respostas.',
    },
    {
      id: 'rag-plus',
      nome: 'RAG Avançado (com re-ranking e query expansion)',
      condicao: () => {
        const necessidadeContexto = respostas.arquitetura?.necessidade_contexto === 'sim_critico';
        const volumeGrande =
          respostas.dados?.volume_dados === 'grande' ||
          respostas.dados?.volume_dados === 'muito_grande';
        const altaEscalabilidade = respostas.arquitetura?.escalabilidade === 'alta';
        return necessidadeContexto && volumeGrande && altaEscalabilidade;
      },
      prioridade: 2,
      motivo:
        'Alto volume de dados e necessidade crítica de precisão justificam técnicas avançadas de RAG.',
    },
    {
      id: 'fine-tuning',
      nome: 'Fine-tuning / SLM Especializado',
      condicao: () => {
        const domainSpecific = respostas.arquitetura?.domain_specific === 'sim';
        const temDados =
          respostas.dados?.tem_dados === 'sim_estruturados' ||
          respostas.dados?.tem_dados === 'sim_nao_estruturados';
        const orcamentoAlto = respostas.implementacao?.orcamento !== 'baixo';
        return domainSpecific && temDados && orcamentoAlto;
      },
      prioridade: 3,
      motivo: 'Domínio especializado com dados disponíveis justifica um modelo customizado.',
    },
    {
      id: 'agentes',
      nome: 'Arquitetura Multi-Agentes',
      condicao: () => {
        const tarefasComplexas = respostas.arquitetura?.complexidade_tasks?.includes('agentes');
        const timeSenior = (respostas.implementacao?.time_tecnico || 0) >= 7;
        return tarefasComplexas && timeSenior;
      },
      prioridade: 4,
      motivo: 'Tarefas complexas encadeadas requerem orquestração de múltiplos agentes.',
    },
    {
      id: 'prompt-only',
      nome: 'Prompt Engineering (APIs Black-box)',
      condicao: () => {
        const semDados = respostas.dados?.tem_dados === 'nao';
        const prazoRapido =
          respostas.descoberta?.prazo === '1-3_meses' ||
          respostas.descoberta?.prazo === '3-6_meses';
        const orcamentoBaixo = respostas.implementacao?.orcamento === 'baixo';
        return semDados || prazoRapido || orcamentoBaixo;
      },
      prioridade: 5,
      motivo:
        'Solução rápida com APIs comerciais é ideal para MVPs ou quando não há dados proprietários.',
    },
  ];

  return regras
    .filter((regra) => regra.condicao())
    .sort((a, b) => a.prioridade - b.prioridade)
    .slice(0, 3) // Retorna top 3 recomendações
    .map((regra) => ({
      id: regra.id,
      nome: regra.nome,
      motivo: regra.motivo,
      prioridade: regra.prioridade,
    }));
}

/**
 * Gera próximos passos baseado nos scores
 */
function gerarProximosPassos(scores, respostas) {
  const passos = [];

  // Verifica scores baixos por etapa
  Object.entries(scores.porEtapa).forEach(([etapa, score]) => {
    if (score < 5) {
      const passosEtapa = {
        descoberta: {
          titulo: 'Refinar alinhamento estratégico',
          descricao:
            'Agende workshops com stakeholders para alinhar objetivos e critérios de sucesso.',
          prioridade: 'alta',
        },
        dados: {
          titulo: 'Melhorar qualidade dos dados',
          descricao:
            'Implemente processos de limpeza, estruturação e validação de dados.',
          prioridade: 'alta',
        },
        arquitetura: {
          titulo: 'Definir arquitetura técnica',
          descricao:
            'Realize PoCs de diferentes arquiteturas antes de comprometer-se com uma abordagem.',
          prioridade: 'alta',
        },
        implementacao: {
          titulo: 'Fortalecer capacidade técnica',
          descricao: 'Invista em treinamento ou contratação de expertise em LLMOps.',
          prioridade: 'media',
        },
        avaliacao: {
          titulo: 'Estabelecer métricas e testes',
          descricao: 'Crie golden datasets e defina processos de avaliação contínua.',
          prioridade: 'alta',
        },
        deploy: {
          titulo: 'Configurar infraestrutura de deploy',
          descricao:
            'Implemente CI/CD, monitoramento e processos de rollback antes do go-live.',
          prioridade: 'media',
        },
        governanca: {
          titulo: 'Implementar governança e compliance',
          descricao:
            'Estabeleça políticas de privacidade, monitoramento de viés e processos de auditoria.',
          prioridade: 'alta',
        },
      };

      if (passosEtapa[etapa]) {
        passos.push(passosEtapa[etapa]);
      }
    }
  });

  // Adiciona passos genéricos se tudo está bem
  if (passos.length === 0) {
    passos.push({
      titulo: 'Iniciar MVP',
      descricao: 'Sua organização está pronta para iniciar o desenvolvimento do MVP.',
      prioridade: 'alta',
    });
    passos.push({
      titulo: 'Estabelecer baseline de métricas',
      descricao: 'Colete métricas iniciais para comparação futura.',
      prioridade: 'media',
    });
  }

  // Ordena por prioridade
  const ordemPrioridade = { alta: 1, media: 2, baixa: 3 };
  return passos.sort((a, b) => ordemPrioridade[a.prioridade] - ordemPrioridade[b.prioridade]);
}

/**
 * Mapeia recursos recomendados (artigos, guias, podcasts)
 */
function mapearRecursos(scores, arquiteturasRecomendadas) {
  const recursos = [];

  // Recursos baseados em arquiteturas recomendadas
  arquiteturasRecomendadas.forEach((arq) => {
    const recursosArq = {
      rag: {
        tipo: 'guia',
        titulo: 'Guia Completo de RAG',
        link: '/guia/arquitetura-rag',
      },
      'rag-plus': {
        tipo: 'artigo',
        titulo: 'RAG Avançado: Re-ranking e Query Expansion',
        link: '/blog/rag-avancado',
      },
      'fine-tuning': {
        tipo: 'guia',
        titulo: 'Fine-tuning de LLMs',
        link: '/guia/fine-tuning',
      },
      agentes: {
        tipo: 'podcast',
        titulo: 'Arquiteturas Multi-Agentes na Prática',
        link: '/podcast/multi-agentes',
      },
      'prompt-only': {
        tipo: 'guia',
        titulo: 'Prompt Engineering Avançado',
        link: '/guia/prompt-engineering',
      },
    };

    if (recursosArq[arq.id]) {
      recursos.push(recursosArq[arq.id]);
    }
  });

  // Recursos de governança se score baixo
  if (scores.porEtapa.governanca < 6) {
    recursos.push({
      tipo: 'artigo',
      titulo: 'Responsible AI e Governança em LLMOps',
      link: '/blog/responsible-ai',
    });
  }

  // Recursos de dados se score baixo
  if (scores.porEtapa.dados < 6) {
    recursos.push({
      tipo: 'guia',
      titulo: 'Preparação de Dados para LLMs',
      link: '/guia/preparacao-dados',
    });
  }

  return recursos;
}

/**
 * Identifica riscos e alertas
 */
function identificarRiscos(respostas, scores) {
  const riscos = [];

  // Risco: Dados de baixa qualidade
  if ((respostas.dados?.qualidade_dados || 0) < 5) {
    riscos.push({
      tipo: 'dados',
      nivel: 'alto',
      titulo: 'Qualidade de dados comprometida',
      descricao:
        'Dados de baixa qualidade podem impactar severamente a precisão do modelo. Priorize limpeza e validação.',
    });
  }

  // Risco: Sem dataset de teste
  if (respostas.avaliacao?.golden_dataset === 'nao') {
    riscos.push({
      tipo: 'avaliacao',
      nivel: 'medio',
      titulo: 'Ausência de golden dataset',
      descricao:
        'Sem um dataset de referência, será difícil avaliar a qualidade das respostas de forma objetiva.',
    });
  }

  // Risco: Compliance não considerado
  if (
    respostas.governanca?.requisitos_regulatorios?.includes('nenhum') &&
    scores.porEtapa.governanca < 5
  ) {
    riscos.push({
      tipo: 'governanca',
      nivel: 'alto',
      titulo: 'Requisitos regulatórios não mapeados',
      descricao:
        'Certifique-se de que não há requisitos de LGPD, HIPAA ou outros antes de prosseguir.',
    });
  }

  // Risco: Time inexperiente
  if ((respostas.implementacao?.time_tecnico || 0) < 5) {
    riscos.push({
      tipo: 'implementacao',
      nivel: 'medio',
      titulo: 'Capacidade técnica limitada',
      descricao:
        'Considere treinamento ou consultoria especializada para acelerar a curva de aprendizado.',
    });
  }

  return riscos;
}

/**
 * Gera todas as recomendações
 */
export function gerarRecomendacoes(diagnostico) {
  const { scores, respostas } = diagnostico;

  const arquiteturasRecomendadas = determinarArquiteturas(scores, respostas);
  const proximosPassos = gerarProximosPassos(scores, respostas);
  const recursosRecomendados = mapearRecursos(scores, arquiteturasRecomendadas);
  const riscos = identificarRiscos(respostas, scores);

  return {
    arquiteturas: arquiteturasRecomendadas,
    proximosPassos,
    recursosRecomendados,
    riscos,
  };
}

