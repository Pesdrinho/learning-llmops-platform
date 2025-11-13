/**
 * Catálogo de Guias
 * Hub central com múltiplos guias para diferentes vertentes do LLMOps
 */

import { macroEtapas as llmopsEtapas } from './guiaEtapas';
import { etapasRAG } from './guiaRAG';

/**
 * Definição de um guia completo
 */
export const guiasCatalogo = {
  llmops: {
    id: 'llmops',
    slug: 'llmops',
    titulo: 'LLMOps Completo',
    subtitulo: 'Guia completo para implementação de sistemas LLMOps',
    descricao: 'Framework estratégico completo para planejar e implementar sistemas LLMOps em produção, desde requisitos até automação.',
    categoria: 'Sistemas de IA',
    nivel: 'Intermediário a Avançado',
    tempoEstimado: '3-4 horas',
    tags: ['LLMOps', 'Produção', 'MLOps', 'Governança'],
    autor: 'Learning LLMOps Platform',
    dataPublicacao: '2024-01-15',
    ultimaAtualizacao: '2024-11-12',
    status: 'completo',
    etapas: Object.values(llmopsEtapas),
    objetivos: [
      'Compreender o ciclo completo de desenvolvimento LLMOps',
      'Implementar sistemas LLM em produção com qualidade',
      'Estabelecer práticas de governança e compliance',
      'Automatizar operações e garantir observabilidade',
    ],
    prerequisitos: [
      'Conhecimento básico de Machine Learning',
      'Familiaridade com conceitos de NLP',
      'Experiência com desenvolvimento de software',
    ],
  },

  rag: {
    id: 'rag',
    slug: 'rag',
    titulo: 'Sistemas RAG (Retrieval-Augmented Generation)',
    subtitulo: 'Construa sistemas RAG robustos e escaláveis',
    descricao: 'Guia prático para implementar sistemas RAG do zero, incluindo indexação vetorial, retrieval otimizado e geração contextualizada.',
    categoria: 'Arquiteturas de IA',
    nivel: 'Intermediário',
    tempoEstimado: '2-3 horas',
    tags: ['RAG', 'Vector Database', 'Embeddings', 'Retrieval'],
    autor: 'Learning LLMOps Platform',
    dataPublicacao: '2024-02-01',
    ultimaAtualizacao: '2024-11-12',
    status: 'completo',
    etapas: Object.values(etapasRAG),
    objetivos: [
      'Entender a arquitetura RAG e seus componentes',
      'Implementar indexação vetorial eficiente',
      'Otimizar estratégias de retrieval e reranking',
      'Avaliar qualidade de sistemas RAG',
    ],
    prerequisitos: [
      'Conhecimento básico de LLMs',
      'Familiaridade com embeddings',
      'Python intermediário',
    ],
  },

  mlops: {
    id: 'mlops',
    slug: 'mlops',
    titulo: 'MLOps Fundamentals',
    subtitulo: 'Fundamentos de operações de Machine Learning',
    descricao: 'Guia introdutório sobre práticas MLOps, CI/CD para modelos, monitoramento e governança de modelos de ML tradicionais.',
    categoria: 'Operações de ML',
    nivel: 'Iniciante a Intermediário',
    tempoEstimado: '2-3 horas',
    tags: ['MLOps', 'CI/CD', 'Monitoramento', 'Versionamento'],
    autor: 'Comunidade',
    dataPublicacao: null,
    ultimaAtualizacao: null,
    status: 'em_desenvolvimento',
    etapas: [],
    objetivos: [
      'Compreender princípios fundamentais de MLOps',
      'Implementar pipelines de treino automatizados',
      'Versionar modelos e datasets',
      'Monitorar modelos em produção',
    ],
    prerequisitos: [
      'Conhecimento básico de ML',
      'Familiaridade com Git',
      'Experiência com Python',
    ],
    mensagemDesenvolvimento: 'Este guia está em desenvolvimento pela comunidade. Quer contribuir? Entre em contato para desenvolver e publicar este conteúdo na plataforma!',
  },

  'data-engineering': {
    id: 'data-engineering',
    slug: 'data-engineering',
    titulo: 'Data Engineering para IA',
    subtitulo: 'Engenharia de dados para projetos de IA',
    descricao: 'Construa pipelines de dados robustos para alimentar sistemas de IA, incluindo ETL, qualidade de dados e arquiteturas modernas.',
    categoria: 'Engenharia de Dados',
    nivel: 'Intermediário',
    tempoEstimado: '3-4 horas',
    tags: ['Data Engineering', 'ETL', 'Data Quality', 'Pipelines'],
    autor: 'Comunidade',
    dataPublicacao: null,
    ultimaAtualizacao: null,
    status: 'em_desenvolvimento',
    etapas: [],
    objetivos: [
      'Projetar arquiteturas de dados para IA',
      'Implementar pipelines ETL escaláveis',
      'Garantir qualidade e governança de dados',
      'Otimizar performance de processamento',
    ],
    prerequisitos: [
      'SQL intermediário',
      'Conhecimento de bancos de dados',
      'Familiaridade com ferramentas de ETL',
    ],
    mensagemDesenvolvimento: 'Este guia está planejado para desenvolvimento futuro. Quer liderar este projeto? Entre em contato para contribuir com a comunidade!',
  },

  'prompt-engineering': {
    id: 'prompt-engineering',
    slug: 'prompt-engineering',
    titulo: 'Prompt Engineering Avançado',
    subtitulo: 'Técnicas avançadas de engenharia de prompts',
    descricao: 'Domine técnicas avançadas de prompt engineering, incluindo few-shot learning, chain-of-thought e prompt optimization.',
    categoria: 'Técnicas de IA',
    nivel: 'Iniciante a Intermediário',
    tempoEstimado: '1-2 horas',
    tags: ['Prompts', 'Few-shot', 'Chain-of-Thought', 'Optimization'],
    autor: 'Comunidade',
    dataPublicacao: null,
    ultimaAtualizacao: null,
    status: 'planejado',
    etapas: [],
    objetivos: [
      'Dominar técnicas de prompt engineering',
      'Implementar few-shot e zero-shot learning',
      'Usar chain-of-thought reasoning',
      'Otimizar prompts para produção',
    ],
    prerequisitos: [
      'Experiência básica com LLMs',
      'Noções de NLP',
    ],
    mensagemDesenvolvimento: 'Este guia está em fase de planejamento. Voluntários são bem-vindos para estruturar e criar este conteúdo!',
  },
};

/**
 * Helpers
 */
export const getTodasGuias = () => {
  return Object.values(guiasCatalogo);
};

export const getGuiaPorSlug = (slug) => {
  return guiasCatalogo[slug] || null;
};

export const getGuiasPorCategoria = (categoria) => {
  return Object.values(guiasCatalogo).filter((guia) => guia.categoria === categoria);
};

export const getGuiasPorStatus = (status) => {
  return Object.values(guiasCatalogo).filter((guia) => guia.status === status);
};

export const getCategorias = () => {
  const categorias = new Set();
  Object.values(guiasCatalogo).forEach((guia) => {
    categorias.add(guia.categoria);
  });
  return Array.from(categorias);
};

export const getNiveis = () => {
  return ['Iniciante', 'Iniciante a Intermediário', 'Intermediário', 'Intermediário a Avançado', 'Avançado'];
};

