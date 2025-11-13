/**
 * Guia completo de implementação de sistemas RAG
 * (Retrieval-Augmented Generation)
 */

export const etapasRAG = {
  'arquitetura-componentes': {
    numero: 1,
    slug: 'arquitetura-componentes',
    titulo: 'Arquitetura e Componentes RAG',
    descricao: 'Entenda os componentes fundamentais de um sistema RAG e como eles se integram.',
    objetivos: [
      'Compreender a arquitetura básica de sistemas RAG',
      'Identificar os componentes principais: indexação, retrieval e geração',
      'Entender o fluxo de dados em um pipeline RAG',
      'Avaliar trade-offs de diferentes abordagens arquiteturais',
    ],
    perguntasChave: [
      {
        pergunta: 'Qual a diferença entre RAG e fine-tuning?',
        orientacao: 'RAG adiciona conhecimento externo em tempo real sem retreinar. Fine-tuning adapta o modelo aos dados. Use RAG para conhecimento dinâmico e atualizado.',
        ferramentas: [],
      },
      {
        pergunta: 'Quais são os componentes essenciais de um sistema RAG?',
        orientacao: 'Indexador (embeddings + vector DB), Retriever (busca por similaridade), Reranker (opcional) e Generator (LLM).',
        ferramentas: [],
      },
    ],
    entregas: [
      {
        nome: 'Diagrama de Arquitetura',
        descricao: 'Documentação visual da arquitetura RAG escolhida',
      },
      {
        nome: 'Documento de Decisões',
        descricao: 'Justificativa de escolhas arquiteturais e trade-offs',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L3',
        nome: 'Arquitetura de Soluções',
        descricao: 'Design de sistemas RAG e integração com aplicações',
      },
    ],
    audiencia: {
      publicoAlvo: 'Engenheiros de ML, arquitetos de soluções e desenvolvedores de aplicações LLM',
      objetivosAprendizado: [
        'Entender fundamentos de RAG',
        'Projetar arquiteturas RAG escaláveis',
      ],
      tempoEstimado: '20-25 min',
    },
    conteudosExternos: [
      {
        type: 'paper',
        title: 'RAG: Retrieval-Augmented Generation (Paper Original)',
        description: 'Paper fundacional que introduz o conceito de RAG',
        author: 'Facebook AI Research',
        url: 'https://arxiv.org/abs/2005.11401',
        duration: '30 min',
        tags: ['pesquisa', 'fundamentos'],
      },
    ],
    proximaEtapa: {
      slug: 'indexacao-embeddings',
      titulo: 'Indexação e Embeddings',
    },
  },

  'indexacao-embeddings': {
    numero: 2,
    slug: 'indexacao-embeddings',
    titulo: 'Indexação e Embeddings',
    descricao: 'Aprenda a transformar documentos em embeddings e indexá-los eficientemente.',
    objetivos: [
      'Escolher modelo de embedding adequado',
      'Implementar estratégias de chunking otimizadas',
      'Configurar vector database para busca eficiente',
      'Otimizar performance de indexação',
    ],
    perguntasChave: [
      {
        pergunta: 'Qual modelo de embedding usar?',
        orientacao: 'Para português: multilingual-e5 ou paraphrase-multilingual. Para inglês: OpenAI text-embedding-3 ou open-source como bge-large.',
        ferramentas: [
          { nome: 'HuggingFace', funcionalidade: 'Modelos de embedding open-source', url: 'https://huggingface.co/models?pipeline_tag=sentence-similarity' },
          { nome: 'OpenAI Embeddings', funcionalidade: 'API de embeddings proprietária', url: 'https://platform.openai.com/docs/guides/embeddings' },
        ],
      },
      {
        pergunta: 'Como definir estratégia de chunking?',
        orientacao: 'Chunks de 512-1024 tokens com overlap de 50-200 tokens. Respeite limites de sentenças/parágrafos. Teste diferentes tamanhos.',
        ferramentas: [
          { nome: 'LangChain', funcionalidade: 'Text splitters configuráveis', url: 'https://python.langchain.com/docs/modules/data_connection/document_transformers/' },
        ],
      },
      {
        pergunta: 'Qual vector database escolher?',
        orientacao: 'Pinecone/Weaviate para managed, Qdrant/Milvus para self-hosted, ou Postgres+pgvector para simplicidade.',
        ferramentas: [
          { nome: 'Pinecone', funcionalidade: 'Vector DB managed', url: 'https://www.pinecone.io' },
          { nome: 'Qdrant', funcionalidade: 'Vector DB open-source', url: 'https://qdrant.tech' },
          { nome: 'Weaviate', funcionalidade: 'Vector DB com busca híbrida', url: 'https://weaviate.io' },
        ],
      },
    ],
    entregas: [
      {
        nome: 'Pipeline de Indexação',
        descricao: 'Código para processar documentos, gerar embeddings e indexar',
      },
      {
        nome: 'Vector Database Configurado',
        descricao: 'Database com índices otimizados e documentos indexados',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L5',
        nome: 'Engenharia de Dados',
        descricao: 'Processamento e indexação de documentos',
      },
    ],
    audiencia: {
      publicoAlvo: 'Engenheiros de dados e ML engineers',
      objetivosAprendizado: [
        'Implementar indexação vetorial',
        'Otimizar chunking de documentos',
      ],
      tempoEstimado: '30-35 min',
    },
    proximaEtapa: {
      slug: 'retrieval-reranking',
      titulo: 'Retrieval e Reranking',
    },
  },

  'retrieval-reranking': {
    numero: 3,
    slug: 'retrieval-reranking',
    titulo: 'Retrieval e Reranking',
    descricao: 'Otimize a recuperação de documentos relevantes e implemente reranking para melhorar qualidade.',
    objetivos: [
      'Implementar busca por similaridade vetorial',
      'Configurar busca híbrida (vetorial + keyword)',
      'Adicionar reranking para melhorar precisão',
      'Otimizar top-k e métricas de retrieval',
    ],
    perguntasChave: [
      {
        pergunta: 'Busca vetorial pura ou híbrida?',
        orientacao: 'Híbrida combina semântica (vetorial) com keyword (BM25). Melhor para casos com termos específicos ou nomes próprios.',
        ferramentas: [
          { nome: 'Weaviate', funcionalidade: 'Busca híbrida nativa', url: 'https://weaviate.io/developers/weaviate/search/hybrid' },
        ],
      },
      {
        pergunta: 'Vale a pena usar reranking?',
        orientacao: 'Sim, se precisão é crítica. Rerankers como Cohere ou cross-encoders melhoram top-3 em 20-40%. Adiciona latência.',
        ferramentas: [
          { nome: 'Cohere Rerank', funcionalidade: 'API de reranking', url: 'https://cohere.com/rerank' },
        ],
      },
    ],
    entregas: [
      {
        nome: 'Sistema de Retrieval',
        descricao: 'Implementação de busca otimizada com reranking',
      },
      {
        nome: 'Benchmark de Retrieval',
        descricao: 'Métricas de precisão, recall e latência',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L6',
        nome: 'Engenharia de ML',
        descricao: 'Otimização de retrieval e ranking',
      },
    ],
    audiencia: {
      publicoAlvo: 'ML engineers e desenvolvedores backend',
      objetivosAprendizado: [
        'Implementar retrieval otimizado',
        'Avaliar qualidade de busca',
      ],
      tempoEstimado: '25-30 min',
    },
    proximaEtapa: {
      slug: 'geracao-prompting',
      titulo: 'Geração e Prompting',
    },
  },

  'geracao-prompting': {
    numero: 4,
    slug: 'geracao-prompting',
    titulo: 'Geração e Prompting',
    descricao: 'Configure o LLM para gerar respostas de qualidade usando contexto recuperado.',
    objetivos: [
      'Desenhar prompts eficazes para RAG',
      'Implementar gestão de contexto e token budget',
      'Adicionar citações e rastreabilidade',
      'Prevenir hallucinations',
    ],
    perguntasChave: [
      {
        pergunta: 'Como estruturar o prompt RAG?',
        orientacao: 'Use: instrução clara + contexto recuperado + pergunta do usuário + instruções de formatação. Sempre peça citações.',
        ferramentas: [],
      },
      {
        pergunta: 'Como prevenir hallucinations?',
        orientacao: 'Instrua o modelo a responder "não sei" se contexto insuficiente. Use temperature baixa (0.1-0.3). Valide respostas com entailment.',
        ferramentas: [],
      },
    ],
    entregas: [
      {
        nome: 'Prompt Templates',
        descricao: 'Templates otimizados para diferentes tipos de query',
      },
      {
        nome: 'Sistema de Geração',
        descricao: 'Pipeline completo de RAG integrado',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L6',
        nome: 'Engenharia de ML',
        descricao: 'Prompt engineering e integração LLM',
      },
    ],
    audiencia: {
      publicoAlvo: 'Desenvolvedores de aplicações LLM',
      objetivosAprendizado: [
        'Criar prompts eficazes para RAG',
        'Integrar retrieval com geração',
      ],
      tempoEstimado: '20-25 min',
    },
    proximaEtapa: {
      slug: 'avaliacao-otimizacao',
      titulo: 'Avaliação e Otimização',
    },
  },

  'avaliacao-otimizacao': {
    numero: 5,
    slug: 'avaliacao-otimizacao',
    titulo: 'Avaliação e Otimização',
    descricao: 'Avalie e otimize a qualidade do sistema RAG com métricas específicas.',
    objetivos: [
      'Implementar métricas de avaliação RAG',
      'Criar conjuntos de teste e golden answers',
      'Otimizar hiperparâmetros do sistema',
      'Monitorar qualidade em produção',
    ],
    perguntasChave: [
      {
        pergunta: 'Quais métricas usar para avaliar RAG?',
        orientacao: 'Retrieval: precision@k, recall@k, MRR. Geração: faithfulness, answer relevancy, context relevancy. Use frameworks como RAGAS.',
        ferramentas: [
          { nome: 'RAGAS', funcionalidade: 'Framework de avaliação RAG', url: 'https://github.com/explodinggradients/ragas' },
        ],
      },
    ],
    entregas: [
      {
        nome: 'Suite de Avaliação',
        descricao: 'Testes automatizados com métricas RAG',
      },
      {
        nome: 'Relatório de Otimização',
        descricao: 'Análise de performance e melhorias implementadas',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L7',
        nome: 'MLOps',
        descricao: 'Avaliação e monitoramento de qualidade',
      },
    ],
    audiencia: {
      publicoAlvo: 'ML engineers e QA engineers',
      objetivosAprendizado: [
        'Avaliar qualidade de sistemas RAG',
        'Implementar monitoramento contínuo',
      ],
      tempoEstimado: '25-30 min',
    },
    proximaEtapa: null,
  },
};

export const getTodasEtapasRAG = () => {
  return Object.values(etapasRAG).sort((a, b) => a.numero - b.numero);
};

export const getEtapaRAGPorSlug = (slug) => {
  return etapasRAG[slug] || null;
};

