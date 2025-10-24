/**
 * Dados completos das macro-etapas do guia LLMOps
 * Organizado por slug para fácil acesso dinâmico
 */

export const macroEtapas = {
  'definicao-requisitos': {
    numero: 1,
    slug: 'definicao-requisitos',
    titulo: 'Definição dos Requisitos',
    descricao: 'Alinhamento estratégico, compliance e governança para estabelecer fundações sólidas do projeto LLMOps.',
    objetivos: [
      'Alinhar o projeto com objetivos estratégicos da organização',
      'Estabelecer políticas de compliance e governança de IA',
      'Definir métricas de sucesso e KPIs do negócio',
      'Identificar stakeholders e mapear requisitos funcionais e não-funcionais',
      'Avaliar viabilidade técnica, financeira e de recursos',
    ],
    perguntasChave: [
      {
        pergunta: 'Qual problema de negócio estamos resolvendo com LLMs?',
        orientacao: 'Seja específico e mensurável. Evite objetivos vagos como "melhorar experiência". Prefira "reduzir tempo médio de resposta em 40% mantendo qualidade acima de 90%".',
      },
      {
        pergunta: 'Quais são os requisitos de compliance e privacidade?',
        orientacao: 'Identifique LGPD/GDPR, regulações de setor (financeiro, saúde), políticas de dados sensíveis e requisitos de auditoria.',
      },
      {
        pergunta: 'Qual o orçamento e prazo esperados?',
        orientacao: 'Defina custos de infraestrutura, APIs de LLM, recursos humanos e prazos realistas para MVP e produção.',
      },
      {
        pergunta: 'Como vamos medir o sucesso?',
        orientacao: 'Estabeleça métricas de negócio (ROI, NPS, redução de custo) e técnicas (latência, acurácia, taxa de fallback).',
      },
    ],
    entregas: [
      {
        nome: 'Business Case',
        descricao: 'Documento com problema, solução proposta, análise de ROI, riscos e alternativas avaliadas',
      },
      {
        nome: 'Matriz de Requisitos',
        descricao: 'Requisitos funcionais, não-funcionais, restrições técnicas e de compliance documentados',
      },
      {
        nome: 'Plano de Governança',
        descricao: 'Políticas de uso de IA, responsabilidades, processos de aprovação e auditoria',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L1',
        nome: 'Estratégia e Visão',
        descricao: 'Alinhamento com objetivos organizacionais e definição de value propositions',
      },
      {
        nivel: 'L2',
        nome: 'Governança de IA',
        descricao: 'Políticas, compliance (LGPD/GDPR), ética e gestão de riscos',
      },
      {
        nivel: 'L3',
        nome: 'Arquitetura Empresarial',
        descricao: 'Integração com sistemas existentes e padrões corporativos',
      },
    ],
    audiencia: {
      publicoAlvo: 'Líderes de produto, gerentes de projetos de IA, arquitetos de soluções e stakeholders de negócio',
      objetivosAprendizado: [
        'Estruturar um business case sólido para projetos LLMOps',
        'Identificar requisitos críticos de compliance e governança',
        'Definir métricas de sucesso alinhadas ao negócio',
      ],
      tempoEstimado: '25-30 min',
    },
    proximaEtapa: {
      slug: 'preprocessamento-dados',
      titulo: 'Pré-processamento dos Dados',
    },
  },

  'preprocessamento-dados': {
    numero: 2,
    slug: 'preprocessamento-dados',
    titulo: 'Pré-processamento dos Dados',
    descricao: 'Coleta, limpeza, estruturação e governança de dados para treino, fine-tuning e/ou indexação vetorial.',
    objetivos: [
      'Identificar e coletar fontes de dados relevantes',
      'Implementar pipelines de limpeza e normalização',
      'Estruturar dados para diferentes arquiteturas (RAG, Fine-tuning, Prompt Engineering)',
      'Garantir qualidade, privacidade e compliance dos dados',
      'Estabelecer versionamento e rastreabilidade de datasets',
    ],
    perguntasChave: [
      {
        pergunta: 'Quais dados são necessários e onde estão armazenados?',
        orientacao: 'Mapeie fontes internas (banco de dados, documentos, logs) e externas (APIs, web scraping). Avalie volume, variedade e velocidade.',
      },
      {
        pergunta: 'Como garantir qualidade e remover viés nos dados?',
        orientacao: 'Implemente validação de qualidade, detecção de duplicatas, análise de viés demográfico e representatividade.',
      },
      {
        pergunta: 'Há dados sensíveis que precisam ser anonimizados?',
        orientacao: 'Identifique PII (nome, CPF, email), dados médicos ou financeiros. Aplique técnicas de mascaramento, tokenização ou pseudonimização.',
      },
      {
        pergunta: 'Qual estratégia de chunking para RAG ou formatação para fine-tuning?',
        orientacao: 'Para RAG: defina tamanho de chunks (512-1024 tokens) e overlap. Para fine-tuning: formate em pares pergunta-resposta ou completion.',
      },
    ],
    entregas: [
      {
        nome: 'Pipeline de Dados',
        descricao: 'ETL automatizado com validação, limpeza e transformação de dados',
      },
      {
        nome: 'Dataset Validado',
        descricao: 'Dados processados com métricas de qualidade, estatísticas e relatório de viés',
      },
      {
        nome: 'Documentação de Dados',
        descricao: 'Data cards com schema, proveniência, limitações e uso apropriado',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L4',
        nome: 'Engenharia de Dados',
        descricao: 'Pipelines, ETL, qualidade de dados e infraestrutura de armazenamento',
      },
      {
        nivel: 'L5',
        nome: 'Ciência de Dados',
        descricao: 'Análise exploratória, feature engineering e preparação de datasets',
      },
    ],
    audiencia: {
      publicoAlvo: 'Engenheiros de dados, cientistas de dados e engenheiros de ML responsáveis pela preparação de datasets',
      objetivosAprendizado: [
        'Implementar pipelines robustos de ETL para dados de LLMs',
        'Aplicar técnicas de limpeza e normalização específicas para NLP',
        'Garantir compliance e privacidade no processamento de dados',
      ],
      tempoEstimado: '30-35 min',
    },
    proximaEtapa: {
      slug: 'engenharia-modelo-treinamento',
      titulo: 'Engenharia de Modelo para Treinamento',
    },
  },

  'engenharia-modelo-treinamento': {
    numero: 3,
    slug: 'engenharia-modelo-treinamento',
    titulo: 'Engenharia de Modelo para Treinamento',
    descricao: 'Seleção, treinamento e fine-tuning de modelos LLM com técnicas modernas e eficientes.',
    objetivos: [
      'Selecionar arquitetura de modelo adequada ao caso de uso',
      'Implementar fine-tuning com LoRA/QLoRA ou métodos PEFT',
      'Configurar pipelines de treinamento escaláveis',
      'Aplicar técnicas de otimização (quantização, distilação)',
      'Versionar modelos e rastrear experimentos',
    ],
    perguntasChave: [
      {
        pergunta: 'Qual modelo base usar: proprietário (GPT, Claude) ou open-source (Llama, Mistral)?',
        orientacao: 'Considere: custo, latência, privacidade de dados, customização necessária e infraestrutura disponível.',
      },
      {
        pergunta: 'Fine-tuning completo ou PEFT (LoRA/QLoRA)?',
        orientacao: 'Fine-tuning completo: maior controle, mais recursos. PEFT: eficiente, rápido, menor custo. Use PEFT quando possível.',
      },
      {
        pergunta: 'Como avaliar qualidade do modelo durante treinamento?',
        orientacao: 'Use métricas como perplexity, BLEU/ROUGE para texto, e métricas customizadas do domínio. Valide em conjunto de teste representativo.',
      },
      {
        pergunta: 'Qual infraestrutura de treinamento?',
        orientacao: 'Cloud (Vertex AI, SageMaker) para escalabilidade ou on-premise para dados sensíveis. Considere GPUs (A100, H100) para modelos grandes.',
      },
    ],
    entregas: [
      {
        nome: 'Modelo Treinado',
        descricao: 'Modelo fine-tuned versionado com checkpoints e adapters LoRA',
      },
      {
        nome: 'Relatório de Experimentos',
        descricao: 'Logs de treinamento, métricas de convergência, comparação de hiperparâmetros',
      },
      {
        nome: 'Model Card',
        descricao: 'Documentação de modelo com arquitetura, dados de treino, limitações e uso recomendado',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L6',
        nome: 'Engenharia de ML',
        descricao: 'Desenvolvimento, treinamento e otimização de modelos',
      },
      {
        nivel: 'L7',
        nome: 'MLOps',
        descricao: 'Automação de pipelines de treino, versionamento e experimentação',
      },
    ],
    audiencia: {
      publicoAlvo: 'Engenheiros de ML, pesquisadores de IA e cientistas de dados focados em desenvolvimento de modelos',
      objetivosAprendizado: [
        'Implementar fine-tuning eficiente com LoRA/QLoRA',
        'Configurar pipelines de treinamento reproduzíveis',
        'Avaliar e comparar modelos sistematicamente',
      ],
      tempoEstimado: '35-40 min',
    },
    proximaEtapa: {
      slug: 'engenharia-modelo-inferencia',
      titulo: 'Engenharia de Modelo para Inferência',
    },
  },

  'engenharia-modelo-inferencia': {
    numero: 4,
    slug: 'engenharia-modelo-inferencia',
    titulo: 'Engenharia de Modelo para Inferência',
    descricao: 'Otimização, deployment e serving de modelos LLM em produção com foco em performance e custo.',
    objetivos: [
      'Otimizar modelos para latência e throughput (quantização, compilação)',
      'Implementar serving escalável (vLLM, TGI, Triton)',
      'Configurar estratégias de cache e batching',
      'Estabelecer SLAs de latência e disponibilidade',
      'Implementar fallbacks e circuit breakers',
    ],
    perguntasChave: [
      {
        pergunta: 'Qual engine de serving usar?',
        orientacao: 'vLLM: melhor throughput e baixa latência. TGI: HuggingFace integration. Triton: multi-framework. Ray Serve: distribuído.',
      },
      {
        pergunta: 'Como otimizar para latência vs throughput?',
        orientacao: 'Latência: reduza batch, use quantização. Throughput: aumente batch, use continuous batching (vLLM), considere múltiplas replicas.',
      },
      {
        pergunta: 'Quantização e otimização: quais técnicas aplicar?',
        orientacao: 'INT8/INT4 quantization, GPTQ, AWQ para reduzir memória. Flash Attention, PagedAttention para velocidade.',
      },
      {
        pergunta: 'Como lidar com picos de tráfego e garantir disponibilidade?',
        orientacao: 'Autoscaling horizontal, rate limiting, queue management, fallback para modelos mais leves ou respostas cached.',
      },
    ],
    entregas: [
      {
        nome: 'Modelo Deployed',
        descricao: 'Modelo servido em produção com endpoint configurado e documentado',
      },
      {
        nome: 'Configuração de Serving',
        descricao: 'Specs de infraestrutura, configs de batching, cache e autoscaling',
      },
      {
        nome: 'SLA e Runbook',
        descricao: 'Definição de SLAs, procedimentos de incident response e troubleshooting',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L8',
        nome: 'Plataforma de ML',
        descricao: 'Infraestrutura de serving, APIs e gerenciamento de endpoints',
      },
      {
        nivel: 'L9',
        nome: 'Operações de ML',
        descricao: 'Deployment, scaling, reliability e incident management',
      },
    ],
    audiencia: {
      publicoAlvo: 'Engenheiros de ML platform, SREs e DevOps especializados em sistemas de ML em produção',
      objetivosAprendizado: [
        'Configurar serving otimizado para LLMs em produção',
        'Implementar estratégias de cache e batching',
        'Estabelecer e monitorar SLAs de inferência',
      ],
      tempoEstimado: '30-35 min',
    },
    proximaEtapa: {
      slug: 'monitoramento-observabilidade',
      titulo: 'Monitoramento e Observabilidade',
    },
  },

  'monitoramento-observabilidade': {
    numero: 5,
    slug: 'monitoramento-observabilidade',
    titulo: 'Monitoramento e Observabilidade',
    descricao: 'Instrumentação, logging, métricas e alertas para garantir qualidade, performance e confiabilidade em produção.',
    objetivos: [
      'Implementar logging estruturado com masking de PII',
      'Configurar métricas de sistema (latência, throughput, erros)',
      'Monitorar métricas de qualidade (hallucination, toxicity, relevance)',
      'Estabelecer alertas proativos e dashboards de observabilidade',
      'Implementar tracing distribuído para debugging',
    ],
    perguntasChave: [
      {
        pergunta: 'Quais métricas são críticas para o negócio?',
        orientacao: 'Latência (p50, p95, p99), taxa de erro, custo por requisição, taxa de fallback, satisfação do usuário (thumbs up/down).',
      },
      {
        pergunta: 'Como detectar e prevenir degradação de qualidade?',
        orientacao: 'Monitor de hallucination, toxicity scores, semantic similarity com golden answers, A/B testing contínuo.',
      },
      {
        pergunta: 'Qual stack de observabilidade usar?',
        orientacao: 'Prometheus + Grafana (open), DataDog/New Relic (comercial), LangSmith/Weights&Biases (LLM-specific).',
      },
      {
        pergunta: 'Como garantir privacidade nos logs?',
        orientacao: 'Implemente PII masking, log sampling, retenção limitada. Nunca logue prompts completos sem anonimização.',
      },
    ],
    entregas: [
      {
        nome: 'Dashboards de Monitoramento',
        descricao: 'Painéis com métricas de sistema, negócio e qualidade em tempo real',
      },
      {
        nome: 'Sistema de Alertas',
        descricao: 'Alertas configurados para SLA violations, erros críticos e anomalias',
      },
      {
        nome: 'Logging Pipeline',
        descricao: 'Pipeline de logs estruturados com PII masking e retenção configurada',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L10',
        nome: 'Observabilidade',
        descricao: 'Logging, métricas, tracing e análise de performance',
      },
      {
        nivel: 'L11',
        nome: 'SRE',
        descricao: 'Reliability engineering, SLOs/SLIs e incident response',
      },
    ],
    audiencia: {
      publicoAlvo: 'SREs, engenheiros de observabilidade e equipes de operações responsáveis por sistemas em produção',
      objetivosAprendizado: [
        'Implementar observabilidade completa para sistemas LLM',
        'Configurar alertas proativos e dashboards efetivos',
        'Detectar e diagnosticar problemas de qualidade e performance',
      ],
      tempoEstimado: '25-30 min',
    },
    proximaEtapa: {
      slug: 'automacao-operacoes',
      titulo: 'Automação de Operações',
    },
  },

  'automacao-operacoes': {
    numero: 6,
    slug: 'automacao-operacoes',
    titulo: 'Automação de Operações',
    descricao: 'CI/CD, IaC, testes automatizados e processos de melhoria contínua para sistemas LLMOps.',
    objetivos: [
      'Implementar CI/CD completo para modelos e aplicações',
      'Automatizar testes de regressão e qualidade',
      'Gerenciar infraestrutura como código (Terraform, Pulumi)',
      'Estabelecer processos de rollback e blue-green deployment',
      'Criar ciclos de feedback e melhoria contínua',
    ],
    perguntasChave: [
      {
        pergunta: 'Qual estratégia de deployment: blue-green, canary ou rolling?',
        orientacao: 'Blue-green: rollback rápido. Canary: teste gradual com % de tráfego. Rolling: sem downtime, mais lento.',
      },
      {
        pergunta: 'Como testar LLMs automaticamente?',
        orientacao: 'Unit tests para código, integration tests para APIs, eval sets com golden answers, regression tests para qualidade.',
      },
      {
        pergunta: 'Qual ferramenta de IaC usar?',
        orientacao: 'Terraform: multi-cloud, maduro. Pulumi: code-first. Cloud-native (CloudFormation, Deployment Manager) para lock-in.',
      },
      {
        pergunta: 'Como automatizar retreinamento e atualização de modelos?',
        orientacao: 'Pipelines Airflow/Prefect para retreino periódico, triggers baseados em drift detection, validação automática antes de deploy.',
      },
    ],
    entregas: [
      {
        nome: 'Pipeline CI/CD',
        descricao: 'Automação completa de build, test, deploy com gates de qualidade',
      },
      {
        nome: 'Infraestrutura como Código',
        descricao: 'Terraform/Pulumi modules para toda infraestrutura versionada',
      },
      {
        nome: 'Suite de Testes',
        descricao: 'Testes unitários, integração, evals automatizados e regression tests',
      },
    ],
    niveisOrganizacionais: [
      {
        nivel: 'L12',
        nome: 'Automação e CI/CD',
        descricao: 'Pipelines automatizados, IaC e deployment automation',
      },
    ],
    audiencia: {
      publicoAlvo: 'DevOps engineers, MLOps engineers e engenheiros de platform responsáveis por automação',
      objetivosAprendizado: [
        'Implementar CI/CD completo para projetos LLMOps',
        'Automatizar testes de qualidade e regressão',
        'Gerenciar infraestrutura de forma reproduzível com IaC',
      ],
      tempoEstimado: '30-35 min',
    },
    proximaEtapa: null, // Última etapa
  },
};

// Helper para obter lista de todas as etapas em ordem
export const getTodasEtapas = () => {
  return Object.values(macroEtapas).sort((a, b) => a.numero - b.numero);
};

// Helper para obter etapa por slug
export const getEtapaPorSlug = (slug) => {
  return macroEtapas[slug] || null;
};

// Lista de slugs válidos
export const slugsValidos = Object.keys(macroEtapas);


