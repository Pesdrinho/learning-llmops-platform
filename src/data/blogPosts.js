/**
 * Dados das postagens do blog
 * Conteúdos separados em arquivos individuais para melhor modularidade
 */

import { content as niveisOrganizacaoContent } from '@/content/blog/niveis-organizacao-llmops';
import { content as melhorArquiteturaContent } from '@/content/blog/melhor-arquitetura-llmops';
import { content as oquePrecisoSaberContent } from '@/content/blog/o-que-preciso-saber-llmops';
import { content as arquiteturasBaseContent } from '@/content/blog/arquiteturas-base-mlops';

export const blogPosts = [
  {
    slug: 'niveis-organizacao-llmops',
    title: 'Do Átomo ao Planeta: A Biologia Secreta Por Trás de Cada Aplicação de IA',
    summary:
      'Entenda como aplicações de IA funcionam através de 12 níveis de organização inspirados na Biologia, do token individual até o ambiente regulatório global.',
    date: '2025-01-20',
    author: 'Pedro Ribeiro Fernandes',
    tags: ['organização', 'arquitetura', 'sistemas', 'fundamentos'],
    image: '/images/blog/niveis-organizacao.jpg',
    readingTime: '12 min de leitura',
    audiencia: {
      publicoAlvo: 'Engenheiros de ML, arquitetos de soluções e profissionais que buscam uma visão sistêmica de aplicações LLM',
      objetivosAprendizado: [
        'Compreender os 12 níveis de organização de um sistema LLM',
        'Entender as interconexões entre componentes técnicos e organizacionais',
        'Identificar como otimizações em um nível impactam todo o sistema',
        'Desenvolver uma visão holística de aplicações de IA',
      ],
      tempoEstimado: '12 min',
    },
    content: niveisOrganizacaoContent,
  },
  {
    slug: 'melhor-arquitetura-llmops',
    title: 'Guia Introdutório de Arquiteturas em LLMOps',
    summary:
      'Explore as 4 arquiteturas fundamentais para aplicações LLM: API Black-Box, RAG, Fine-Tuning e Agentes. Aprenda quando usar cada uma e como escolher a arquitetura certa para o seu projeto.',
    date: '2025-01-18',
    author: 'Pedro Ribeiro Fernandes',
    tags: ['arquitetura', 'rag', 'fine-tuning', 'agentes', 'prompt-engineering'],
    image: '/images/blog/arquiteturas-mlops.jpg',
    readingTime: '20 min de leitura',
    audiencia: {
      publicoAlvo: 'Iniciantes em LLMOps, engenheiros de software e profissionais que precisam escolher a arquitetura adequada para projetos de IA',
      objetivosAprendizado: [
        'Dominar as 4 arquiteturas essenciais: API Black-Box, RAG, Fine-Tuning e Agentes',
        'Aplicar um guia de decisão em 4 passos para escolher a arquitetura certa',
        'Identificar anti-padrões comuns e como evitá-los',
        'Compreender componentes-chave e métricas de sucesso de cada arquitetura',
      ],
      tempoEstimado: '20 min',
    },
    content: melhorArquiteturaContent,
  },
  {
    slug: 'o-que-preciso-saber-llmops',
    title: '5 Lições de um Framework de LLMOps para o Mundo Real',
    summary:
      'Descubra insights contra-intuitivos que separam projetos experimentais de sistemas de IA em produção. Lições práticas de governança, custo, resiliência e engenharia.',
    date: '2025-01-15',
    author: 'Pedro Ribeiro Fernandes',
    tags: ['fundamentos', 'boas-práticas', 'produção', 'engenharia'],
    image: '/images/blog/llmops-lessons.jpg',
    readingTime: '15 min de leitura',
    audiencia: {
      publicoAlvo: 'Engenheiros, arquitetos e líderes técnicos que querem entender como construir sistemas LLM maduros e prontos para produção',
      objetivosAprendizado: [
        'Compreender a diferença entre protótipos e sistemas de produção',
        'Aplicar governança e FinOps desde o início do projeto',
        'Projetar sistemas resilientes que falham de forma inteligente',
        'Tratar prompts e dados como código versionado',
      ],
      tempoEstimado: '15 min',
    },
    content: oquePrecisoSaberContent,
  },
  {
    slug: 'arquiteturas-base-mlops',
    title: 'Guia de Decisão: Escolhendo sua Arquitetura LLMOps',
    summary:
      'Um guia prático em formato de árvore de decisão para iniciantes escolherem a arquitetura LLMOps mais adequada: API Black-Box, RAG ou Fine-Tuning.',
    date: '2025-01-12',
    author: 'Pedro Ribeiro Fernandes',
    tags: ['arquitetura', 'decisão', 'iniciantes', 'guia-prático'],
    image: '/images/blog/intro-ia.jpg',
    readingTime: '18 min de leitura',
    audiencia: {
      publicoAlvo: 'Iniciantes em LLMOps que precisam de um guia prático e direto para escolher a arquitetura certa para seu primeiro projeto',
      objetivosAprendizado: [
        'Aplicar uma árvore de decisão simples para escolher arquiteturas',
        'Compreender quando usar API Black-Box, RAG ou Fine-Tuning',
        'Identificar componentes-chave de cada arquitetura',
        'Considerar risco regulatório e privacidade nas decisões',
      ],
      tempoEstimado: '18 min',
    },
    content: arquiteturasBaseContent,
  },
];

// Helper para obter post por slug
export const getPostPorSlug = (slug) => {
  return blogPosts.find((post) => post.slug === slug) || null;
};

// Helper para obter posts por tag
export const getPostsPorTag = (tag) => {
  return blogPosts.filter((post) => post.tags.includes(tag));
};

// Helper para obter todas as tags únicas
export const getTodasTags = () => {
  const tags = new Set();
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
};

// Helper para ordenar posts por data (mais recentes primeiro)
export const getPostsOrdenados = () => {
  return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
};
