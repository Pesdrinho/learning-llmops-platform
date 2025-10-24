/**
 * Stack de ferramentas organizadas por macro-etapas do LLMOps
 * Dados placeholder - serão expandidos com conteúdo detalhado
 */

export const stackFerramentas = {
  'definicao-requisitos': {
    numero: 1,
    slug: 'definicao-requisitos',
    titulo: 'Definição dos Requisitos',
    descricao: 'Ferramentas para estratégia, compliance e governança',
    ferramentas: [
      {
        nome: 'Confluence',
        descricao: 'Documentação colaborativa para business cases e requisitos',
        categoria: 'comercial',
        logo: null,
        link: 'https://www.atlassian.com/software/confluence',
        tags: ['documentação', 'colaboração'],
      },
      {
        nome: 'Miro',
        descricao: 'Quadro branco colaborativo para brainstorming e mapeamento de requisitos',
        categoria: 'comercial',
        logo: null,
        link: 'https://miro.com',
        tags: ['brainstorming', 'mapeamento'],
      },
      {
        nome: 'JIRA',
        descricao: 'Gestão de projetos e tracking de requisitos',
        categoria: 'comercial',
        logo: null,
        link: 'https://www.atlassian.com/software/jira',
        tags: ['gestão', 'tracking'],
      },
      {
        nome: 'Notion',
        descricao: 'Workspace all-in-one para documentação e planejamento',
        categoria: 'híbrido',
        logo: null,
        link: 'https://www.notion.so',
        tags: ['documentação', 'planejamento'],
      },
    ],
  },

  'preprocessamento-dados': {
    numero: 2,
    slug: 'preprocessamento-dados',
    titulo: 'Pré-processamento dos Dados',
    descricao: 'Ferramentas para ETL, limpeza e preparação de dados',
    ferramentas: [
      {
        nome: 'Apache Airflow',
        descricao: 'Orquestração de pipelines de dados e workflows',
        categoria: 'open-source',
        logo: null,
        link: 'https://airflow.apache.org',
        tags: ['etl', 'orquestração', 'workflows'],
      },
      {
        nome: 'Prefect',
        descricao: 'Framework moderno para orquestração de workflows de dados',
        categoria: 'open-source',
        logo: null,
        link: 'https://www.prefect.io',
        tags: ['workflow', 'orquestração'],
      },
      {
        nome: 'dbt (data build tool)',
        descricao: 'Transformação de dados com SQL e versionamento',
        categoria: 'open-source',
        logo: null,
        link: 'https://www.getdbt.com',
        tags: ['transformação', 'sql'],
      },
      {
        nome: 'Great Expectations',
        descricao: 'Validação e qualidade de dados',
        categoria: 'open-source',
        logo: null,
        link: 'https://greatexpectations.io',
        tags: ['qualidade', 'validação'],
      },
      {
        nome: 'Pandas',
        descricao: 'Biblioteca Python para manipulação e análise de dados',
        categoria: 'open-source',
        logo: null,
        link: 'https://pandas.pydata.org',
        tags: ['python', 'análise'],
      },
      {
        nome: 'Apache Spark',
        descricao: 'Processamento distribuído de grandes volumes de dados',
        categoria: 'open-source',
        logo: null,
        link: 'https://spark.apache.org',
        tags: ['big-data', 'distribuído'],
      },
    ],
  },

  'engenharia-modelo-treinamento': {
    numero: 3,
    slug: 'engenharia-modelo-treinamento',
    titulo: 'Engenharia de Modelo para Treinamento',
    descricao: 'Ferramentas para fine-tuning e treinamento de LLMs',
    ferramentas: [
      {
        nome: 'HuggingFace Transformers',
        descricao: 'Biblioteca para trabalhar com modelos transformer',
        categoria: 'open-source',
        logo: null,
        link: 'https://huggingface.co/transformers',
        tags: ['transformers', 'nlp'],
      },
      {
        nome: 'PEFT (Parameter-Efficient Fine-Tuning)',
        descricao: 'Técnicas eficientes de fine-tuning como LoRA e QLoRA',
        categoria: 'open-source',
        logo: null,
        link: 'https://github.com/huggingface/peft',
        tags: ['fine-tuning', 'lora'],
      },
      {
        nome: 'PyTorch',
        descricao: 'Framework de deep learning para treinamento de modelos',
        categoria: 'open-source',
        logo: null,
        link: 'https://pytorch.org',
        tags: ['deep-learning', 'treinamento'],
      },
      {
        nome: 'DeepSpeed',
        descricao: 'Otimização de treinamento distribuído em larga escala',
        categoria: 'open-source',
        logo: null,
        link: 'https://www.deepspeed.ai',
        tags: ['otimização', 'distribuído'],
      },
      {
        nome: 'Axolotl',
        descricao: 'Framework simplificado para fine-tuning de LLMs',
        categoria: 'open-source',
        logo: null,
        link: 'https://github.com/OpenAccess-AI-Collective/axolotl',
        tags: ['fine-tuning', 'simplicidade'],
      },
      {
        nome: 'W&B (Weights & Biases)',
        descricao: 'Tracking de experimentos e versionamento de modelos',
        categoria: 'comercial',
        logo: null,
        link: 'https://wandb.ai',
        tags: ['tracking', 'experimentos'],
      },
      {
        nome: 'MLflow',
        descricao: 'Plataforma open-source para gerenciar ciclo de vida de ML',
        categoria: 'open-source',
        logo: null,
        link: 'https://mlflow.org',
        tags: ['mlops', 'tracking'],
      },
    ],
  },

  'engenharia-modelo-inferencia': {
    numero: 4,
    slug: 'engenharia-modelo-inferencia',
    titulo: 'Engenharia de Modelo para Inferência',
    descricao: 'Ferramentas para serving e otimização de inferência',
    ferramentas: [
      {
        nome: 'vLLM',
        descricao: 'Serving otimizado para LLMs com alta throughput',
        categoria: 'open-source',
        logo: null,
        link: 'https://github.com/vllm-project/vllm',
        tags: ['serving', 'performance'],
      },
      {
        nome: 'Text Generation Inference (TGI)',
        descricao: 'Serving de modelos HuggingFace em produção',
        categoria: 'open-source',
        logo: null,
        link: 'https://github.com/huggingface/text-generation-inference',
        tags: ['serving', 'huggingface'],
      },
      {
        nome: 'Triton Inference Server',
        descricao: 'Servidor de inferência multi-framework da NVIDIA',
        categoria: 'open-source',
        logo: null,
        link: 'https://github.com/triton-inference-server',
        tags: ['serving', 'multi-framework'],
      },
      {
        nome: 'Ray Serve',
        descricao: 'Framework escalável para serving de modelos ML',
        categoria: 'open-source',
        logo: null,
        link: 'https://docs.ray.io/en/latest/serve',
        tags: ['serving', 'escalável'],
      },
      {
        nome: 'LiteLLM',
        descricao: 'Interface unificada para múltiplos providers de LLM',
        categoria: 'open-source',
        logo: null,
        link: 'https://github.com/BerriAI/litellm',
        tags: ['gateway', 'multi-provider'],
      },
      {
        nome: 'OpenAI API',
        descricao: 'API para modelos GPT da OpenAI',
        categoria: 'comercial',
        logo: null,
        link: 'https://platform.openai.com',
        tags: ['api', 'gpt'],
      },
      {
        nome: 'Anthropic Claude',
        descricao: 'API para modelos Claude da Anthropic',
        categoria: 'comercial',
        logo: null,
        link: 'https://www.anthropic.com',
        tags: ['api', 'claude'],
      },
    ],
  },

  'monitoramento-observabilidade': {
    numero: 5,
    slug: 'monitoramento-observabilidade',
    titulo: 'Monitoramento e Observabilidade',
    descricao: 'Ferramentas para logging, métricas e observabilidade',
    ferramentas: [
      {
        nome: 'LangSmith',
        descricao: 'Observabilidade especializada para aplicações LLM',
        categoria: 'comercial',
        logo: null,
        link: 'https://www.langchain.com/langsmith',
        tags: ['observabilidade', 'llm'],
      },
      {
        nome: 'Phoenix (Arize AI)',
        descricao: 'Observabilidade open-source para LLMs',
        categoria: 'open-source',
        logo: null,
        link: 'https://phoenix.arize.com',
        tags: ['observabilidade', 'open-source'],
      },
      {
        nome: 'Prometheus',
        descricao: 'Sistema de monitoramento e alertas',
        categoria: 'open-source',
        logo: null,
        link: 'https://prometheus.io',
        tags: ['monitoramento', 'métricas'],
      },
      {
        nome: 'Grafana',
        descricao: 'Visualização de métricas e dashboards',
        categoria: 'open-source',
        logo: null,
        link: 'https://grafana.com',
        tags: ['visualização', 'dashboards'],
      },
      {
        nome: 'Datadog',
        descricao: 'Plataforma de monitoramento e observabilidade',
        categoria: 'comercial',
        logo: null,
        link: 'https://www.datadoghq.com',
        tags: ['monitoramento', 'apm'],
      },
      {
        nome: 'RAGAS',
        descricao: 'Framework para avaliação de sistemas RAG',
        categoria: 'open-source',
        logo: null,
        link: 'https://github.com/explodinggradients/ragas',
        tags: ['avaliação', 'rag'],
      },
      {
        nome: 'LangFuse',
        descricao: 'Observabilidade open-source para aplicações LLM',
        categoria: 'open-source',
        logo: null,
        link: 'https://langfuse.com',
        tags: ['observabilidade', 'tracing'],
      },
    ],
  },

  'automacao-operacoes': {
    numero: 6,
    slug: 'automacao-operacoes',
    titulo: 'Automação de Operações',
    descricao: 'Ferramentas para CI/CD, IaC e automação',
    ferramentas: [
      {
        nome: 'GitHub Actions',
        descricao: 'CI/CD integrado ao GitHub',
        categoria: 'comercial',
        logo: null,
        link: 'https://github.com/features/actions',
        tags: ['ci-cd', 'automação'],
      },
      {
        nome: 'GitLab CI/CD',
        descricao: 'Pipeline de CI/CD integrado ao GitLab',
        categoria: 'híbrido',
        logo: null,
        link: 'https://docs.gitlab.com/ee/ci',
        tags: ['ci-cd', 'devops'],
      },
      {
        nome: 'Terraform',
        descricao: 'Infraestrutura como código multi-cloud',
        categoria: 'open-source',
        logo: null,
        link: 'https://www.terraform.io',
        tags: ['iac', 'multi-cloud'],
      },
      {
        nome: 'Pulumi',
        descricao: 'IaC com linguagens de programação',
        categoria: 'híbrido',
        logo: null,
        link: 'https://www.pulumi.com',
        tags: ['iac', 'code-first'],
      },
      {
        nome: 'Docker',
        descricao: 'Containerização de aplicações',
        categoria: 'open-source',
        logo: null,
        link: 'https://www.docker.com',
        tags: ['container', 'deployment'],
      },
      {
        nome: 'Kubernetes',
        descricao: 'Orquestração de containers',
        categoria: 'open-source',
        logo: null,
        link: 'https://kubernetes.io',
        tags: ['orquestração', 'k8s'],
      },
      {
        nome: 'ArgoCD',
        descricao: 'GitOps continuous delivery para Kubernetes',
        categoria: 'open-source',
        logo: null,
        link: 'https://argo-cd.readthedocs.io',
        tags: ['gitops', 'cd'],
      },
    ],
  },
};

// Helper para obter todas as etapas em ordem
export const getTodasEtapasStack = () => {
  return Object.values(stackFerramentas).sort((a, b) => a.numero - b.numero);
};

// Helper para obter etapa por slug
export const getEtapaStackPorSlug = (slug) => {
  return stackFerramentas[slug] || null;
};

// Helper para obter ferramentas por categoria
export const getFerramentasPorCategoria = (categoria) => {
  const ferramentas = [];
  Object.values(stackFerramentas).forEach((etapa) => {
    etapa.ferramentas.forEach((ferramenta) => {
      if (ferramenta.categoria === categoria) {
        ferramentas.push({ ...ferramenta, etapa: etapa.titulo });
      }
    });
  });
  return ferramentas;
};

// Helper para obter todas as ferramentas
export const getTodasFerramentas = () => {
  const ferramentas = [];
  Object.values(stackFerramentas).forEach((etapa) => {
    etapa.ferramentas.forEach((ferramenta) => {
      ferramentas.push({ ...ferramenta, etapa: etapa.titulo });
    });
  });
  return ferramentas;
};


