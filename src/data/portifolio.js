/**
 * Dados do portfólio pessoal
 * Informações fictícias como exemplo - substituir por dados reais
 */

export const portifolio = {
  hero: {
    nome: 'Dr. Alexandre Silva',
    cargo: 'Especialista em LLMOps & Arquitetura de IA',
    bio: 'Engenheiro de ML com 8+ anos de experiência em sistemas de IA em produção, especializado em arquiteturas LLMOps escaláveis e governança de modelos de linguagem.',
    foto: '/images/profile.jpg',
    localizacao: 'São Paulo, Brasil',
    email: 'contato@exemplo.com',
    linkedin: 'https://linkedin.com/in/exemplo',
    github: 'https://github.com/exemplo',
    twitter: 'https://twitter.com/exemplo',
  },

  experiencias: [
    {
      id: 1,
      cargo: 'Principal ML Engineer',
      empresa: 'TechCorp Global',
      periodo: 'Jan 2022 - Presente',
      local: 'São Paulo, SP',
      descricao: 'Liderança técnica de equipe de ML engineers na implementação de sistemas LLMOps para produtos de IA generativa.',
      realizacoes: [
        'Arquitetou e implementou plataforma LLMOps servindo 10M+ requisições/dia',
        'Reduziu custos de inferência em 60% através de otimizações de serving',
        'Estabeleceu framework de governança de IA adotado por toda organização',
        'Mentorou 5+ engenheiros seniores em práticas de LLMOps',
      ],
      tecnologias: ['Python', 'PyTorch', 'vLLM', 'Kubernetes', 'GCP', 'LangChain', 'Vector DBs'],
    },
    {
      id: 2,
      cargo: 'Senior ML Engineer',
      empresa: 'FinTech Solutions',
      periodo: 'Mar 2019 - Dez 2021',
      local: 'São Paulo, SP',
      descricao: 'Desenvolvimento de sistemas de ML para detecção de fraude e análise de risco de crédito.',
      realizacoes: [
        'Implementou pipeline de fine-tuning para modelos de NLP em produção',
        'Desenvolveu sistema RAG para análise de documentos financeiros',
        'Criou framework de avaliação de modelos com RAGAS',
        'Reduziu tempo de deploy de modelos de semanas para horas',
      ],
      tecnologias: ['Python', 'TensorFlow', 'MLflow', 'Airflow', 'AWS', 'PostgreSQL'],
    },
    {
      id: 3,
      cargo: 'ML Engineer',
      empresa: 'Startup AI Lab',
      periodo: 'Jun 2017 - Fev 2019',
      local: 'Campinas, SP',
      descricao: 'Pesquisa e desenvolvimento de modelos de NLP para chatbots e assistentes virtuais.',
      realizacoes: [
        'Desenvolveu pipeline de treinamento de modelos transformer',
        'Implementou sistema de avaliação A/B de respostas de chatbot',
        'Criou dataset proprietário com 100k+ conversas anotadas',
      ],
      tecnologias: ['Python', 'PyTorch', 'Rasa', 'spaCy', 'Docker', 'MongoDB'],
    },
  ],

  formacao: [
    {
      id: 1,
      grau: 'Ph.D. em Ciência da Computação',
      instituicao: 'Universidade Estadual de Campinas (UNICAMP)',
      periodo: '2015 - 2019',
      area: 'Processamento de Linguagem Natural e Aprendizado de Máquina',
      tese: 'Métodos Eficientes para Fine-tuning de Modelos de Linguagem de Grande Escala',
    },
    {
      id: 2,
      grau: 'M.Sc. em Engenharia de Computação',
      instituicao: 'Universidade de São Paulo (USP)',
      periodo: '2013 - 2015',
      area: 'Inteligência Artificial',
      dissertacao: 'Sistemas de Diálogo baseados em Aprendizado por Reforço',
    },
    {
      id: 3,
      grau: 'Bacharel em Ciência da Computação',
      instituicao: 'Universidade de São Paulo (USP)',
      periodo: '2009 - 2012',
      area: 'Ciência da Computação',
      honras: 'Magna Cum Laude',
    },
  ],

  projetos: [
    {
      id: 1,
      nome: 'LLMOps Platform Framework',
      descricao: 'Framework open-source para implementação de pipelines LLMOps com foco em observabilidade e governança.',
      destaque: true,
      tecnologias: ['Python', 'FastAPI', 'LangChain', 'Prometheus', 'Grafana'],
      link: 'https://github.com/exemplo/llmops-platform',
      status: 'Ativo',
    },
    {
      id: 2,
      nome: 'RAG Evaluation Toolkit',
      descricao: 'Biblioteca para avaliação sistemática de sistemas RAG usando RAGAS e métricas customizadas.',
      destaque: true,
      tecnologias: ['Python', 'RAGAS', 'ChromaDB', 'Jupyter'],
      link: 'https://github.com/exemplo/rag-eval',
      status: 'Ativo',
    },
    {
      id: 3,
      nome: 'Prompt Engineering Best Practices',
      descricao: 'Coletânea de templates e padrões para prompt engineering em diferentes domínios.',
      destaque: false,
      tecnologias: ['LangChain', 'OpenAI', 'Anthropic'],
      link: 'https://github.com/exemplo/prompt-patterns',
      status: 'Arquivado',
    },
    {
      id: 4,
      nome: 'Cost Optimizer for LLMs',
      descricao: 'Ferramenta para otimização de custos de inferência com análise de trade-offs latência vs custo.',
      destaque: true,
      tecnologias: ['Python', 'Streamlit', 'Pandas'],
      link: 'https://github.com/exemplo/llm-cost-optimizer',
      status: 'Ativo',
    },
  ],

  palestras: [
    {
      id: 1,
      titulo: 'LLMOps em Produção: Do MVP ao Scale',
      evento: 'AI Summit Brazil 2024',
      data: '2024-11-15',
      local: 'São Paulo, SP',
      tipo: 'Keynote',
      audiencia: '500+ participantes',
      link: 'https://youtube.com/exemplo',
    },
    {
      id: 2,
      titulo: 'Arquiteturas RAG: Quando, Como e Por Quê',
      evento: 'MLOps Community Meetup',
      data: '2024-09-20',
      local: 'São Paulo, SP (Hybrid)',
      tipo: 'Talk Técnico',
      audiencia: '200+ participantes',
      link: 'https://youtube.com/exemplo',
    },
    {
      id: 3,
      titulo: 'Governança e Ética em Sistemas LLM',
      evento: 'Data Science Conference',
      data: '2024-06-10',
      local: 'Rio de Janeiro, RJ',
      tipo: 'Panel Discussion',
      audiencia: '300+ participantes',
      link: null,
    },
    {
      id: 4,
      titulo: 'Workshop: Implementando Fine-tuning com LoRA',
      evento: 'PythonBrasil 2024',
      data: '2024-10-05',
      local: 'Florianópolis, SC',
      tipo: 'Workshop',
      audiencia: '80 participantes',
      link: 'https://github.com/exemplo/lora-workshop',
    },
  ],

  consultorias: [
    {
      id: 1,
      cliente: 'Banco Nacional S.A.',
      projeto: 'Implementação de Sistema RAG para Atendimento ao Cliente',
      periodo: '2024',
      descricao: 'Arquitetura e implementação de sistema RAG para automatizar atendimento de primeiro nível.',
      resultados: [
        '70% de redução no tempo de resposta',
        '85% de acurácia nas respostas',
        'ROI positivo em 6 meses',
      ],
    },
    {
      id: 2,
      cliente: 'E-commerce Líder',
      projeto: 'Otimização de Custos de Inferência LLM',
      periodo: '2024',
      descricao: 'Análise e otimização de pipeline de inferência para recomendação de produtos.',
      resultados: [
        '55% de redução em custos de API',
        'Latência p95 < 200ms',
        'Implementação de cache inteligente',
      ],
    },
    {
      id: 3,
      cliente: 'Healthtech Innovation',
      projeto: 'Governança e Compliance de IA em Saúde',
      periodo: '2023',
      descricao: 'Estabelecimento de framework de governança para sistemas de IA em contexto de saúde.',
      resultados: [
        'Compliance com LGPD e regulações de saúde',
        'Framework de auditoria implementado',
        'Documentação de modelos (Model Cards)',
      ],
    },
  ],

  habilidades: {
    'LLMs & NLP': [
      'OpenAI GPT',
      'Anthropic Claude',
      'Llama 2/3',
      'Mistral',
      'Fine-tuning (LoRA/QLoRA)',
      'Prompt Engineering',
      'RAG Systems',
    ],
    'MLOps & Infrastructure': [
      'Kubernetes',
      'Docker',
      'Terraform',
      'GitHub Actions',
      'MLflow',
      'Weights & Biases',
      'vLLM',
      'Ray Serve',
    ],
    'Cloud Platforms': [
      'Google Cloud Platform',
      'AWS (SageMaker, Bedrock)',
      'Azure OpenAI',
      'Vertex AI',
    ],
    'Dados & Vetores': [
      'ChromaDB',
      'Pinecone',
      'Weaviate',
      'PostgreSQL + pgvector',
      'Redis',
      'MongoDB',
    ],
    'Linguagens': [
      'Python (Expert)',
      'SQL (Avançado)',
      'JavaScript (Intermediário)',
      'Go (Básico)',
    ],
    'Frameworks': [
      'LangChain',
      'LlamaIndex',
      'Haystack',
      'FastAPI',
      'PyTorch',
      'HuggingFace',
    ],
  },

  certificacoes: [
    {
      nome: 'Google Cloud Professional ML Engineer',
      instituicao: 'Google Cloud',
      ano: '2023',
    },
    {
      nome: 'AWS Certified Machine Learning - Specialty',
      instituicao: 'Amazon Web Services',
      ano: '2022',
    },
    {
      nome: 'Deep Learning Specialization',
      instituicao: 'deeplearning.ai (Coursera)',
      ano: '2018',
    },
  ],
};


