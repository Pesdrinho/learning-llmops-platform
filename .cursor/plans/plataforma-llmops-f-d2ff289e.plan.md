<!-- d2ff289e-da11-4dbe-ae9b-6fff532313bc a0fafce2-9d24-4d05-95b9-9a5870c61b29 -->
# Plano de Implementação: Fases 2-3 LLMOps

## Visão Geral

Implementação incremental das funcionalidades de diagnóstico (formulários inteligentes com Firestore) e galeria de arquiteturas (diagramas React Flow interativos), mantendo modularidade e preparação para recomendações futuras.

---

## FASE 2: Diagnóstico & Formulários Inteligentes

### 2.0 Requisitos da funcionalidade de formulário

- Ser modular e facilmente modificável
- O campo das respostas deve ser um jsonb, para que eu não precise modificar o meu schema de banco de dados caso as perguntas e respostas sejam modificadas
- Cada formulário deve conter o elemento de direcionamento de público já criado, para mostrar para quem é direcionado esse formulário e qual o seu objetivo

### 2.1 Estrutura de Dados Firestore

#### Collections e Documentos

```
users/
  {userId}/
    profile/
      - displayName
      - email
      - createdAt
      - updatedAt
    
diagnosticos/
  {diagnosticoId}/
    - userId (referência)
    - etapaAtual (número da etapa)
    - status ('em_andamento' | 'concluido')
    - createdAt
    - updatedAt
    - completedAt
    - respostas: {
        descoberta: { ... },
        dados: { ... },
        arquitetura: { ... },
        // ... demais etapas
      }
    - scores: {
        porEtapa: { descoberta: 8, dados: 6, ... },
        porNivel: { L1: 7, L2: 8, ... },
        geral: 7.2
      }
    - recomendacoes: {
        arquiteturas: ['RAG', 'Fine-tuning'],
        proximosPassos: [...],
        recursosRecomendados: [...]
      }
    - metadados: {
        tempoGasto: 1800, // segundos
        revisoes: 2
      }
```

#### Regras de Segurança Firestore

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isOwner(userId);
      allow delete: if false; // Nunca permitir delete direto
    }
    
    // Diagnósticos
    match /diagnosticos/{diagnosticoId} {
      allow read: if isOwner(resource.data.userId);
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow update: if isOwner(resource.data.userId);
      allow delete: if isOwner(resource.data.userId);
    }
  }
}
```

### 2.2 Componentes de Formulário

#### Biblioteca de Form Components

**`src/components/forms/`**

```
forms/
├── FormProgress.jsx          # Barra de progresso visual
├── FormNavigation.jsx        # Navegação entre etapas
├── QuestionCard.jsx          # Card individual de pergunta
├── RadioGroup.jsx            # Grupo de radio buttons estilizado
├── CheckboxGroup.jsx         # Grupo de checkboxes
├── ScaleInput.jsx            # Input de escala (1-10)
├── TextAreaInput.jsx         # Textarea com contador
├── AutoSave.jsx              # Hook de auto-save
└── FormSummary.jsx           # Resumo final do formulário
```

#### Hook de Gerenciamento de Formulário

**`src/hooks/useDiagnostico.js`**

```javascript
export function useDiagnostico(diagnosticoId) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Buscar diagnóstico
  const { data: diagnostico, isLoading } = useQuery({
    queryKey: ['diagnostico', diagnosticoId],
    queryFn: () => getDiagnostico(diagnosticoId),
    enabled: !!user && !!diagnosticoId
  });
  
  // Salvar resposta
  const { mutate: salvarResposta } = useMutation({
    mutationFn: (dados) => updateDiagnostico(diagnosticoId, dados),
    onSuccess: () => {
      queryClient.invalidateQueries(['diagnostico', diagnosticoId]);
    }
  });
  
  // Calcular scores
  const calcularScores = useCallback(() => {
    // Lógica de cálculo baseada nas respostas
  }, [diagnostico]);
  
  return { diagnostico, salvarResposta, calcularScores, isLoading };
}
```

### 2.3 Engine de Pontuação e Recomendações

**`src/lib/diagnostico/`**

```
diagnostico/
├── scoringEngine.js          # Motor de pontuação
├── recommendationEngine.js   # Motor de recomendações
├── questions.js              # Banco de perguntas
└── decisisionTree.js         # Árvore de decisão
```

#### Exemplo de Scoring Engine

```javascript
// scoringEngine.js
export function calcularScoreEtapa(etapa, respostas) {
  const pesos = PESOS_POR_ETAPA[etapa];
  let score = 0;
  
  Object.entries(respostas).forEach(([pergunta, resposta]) => {
    const peso = pesos[pergunta] || 1;
    score += (resposta.valor * peso);
  });
  
  return Math.min(10, score / Object.keys(respostas).length);
}

export function calcularScoreNivel(nivel, todasRespostas) {
  const perguntasRelevantes = MAPA_NIVEL_PERGUNTAS[nivel];
  // Lógica de cálculo cross-etapas
}
```

#### Motor de Recomendações

```javascript
// recommendationEngine.js
export function gerarRecomendacoes(diagnostico) {
  const { scores, respostas } = diagnostico;
  
  const recomendacoes = {
    arquiteturas: determinarArquiteturas(scores, respostas),
    proximosPassos: gerarProximosPassos(scores),
    recursosRecomendados: mapearRecursos(scores),
    alertas: identificarRiscos(respostas)
  };
  
  return recomendacoes;
}

function determinarArquiteturas(scores, respostas) {
  const regras = [
    {
      condicao: () => respostas.dados?.volumeDados === 'grande' && 
                     respostas.arquitetura?.necessidadeContexto === 'alta',
      arquitetura: 'RAG',
      prioridade: 1
    },
    {
      condicao: () => respostas.arquitetura?.domainSpecific === 'sim',
      arquitetura: 'Fine-tuning',
      prioridade: 2
    },
    // ... mais regras
  ];
  
  return regras
    .filter(r => r.condicao())
    .sort((a, b) => a.prioridade - b.prioridade)
    .map(r => r.arquitetura);
}
```

### 2.4 Páginas e Fluxo

**`src/pages/Diagnostico/`**

```
Diagnostico/
├── index.jsx                 # Landing do diagnóstico
├── NovoDiagnostico.jsx       # Iniciar novo
├── Formulario.jsx            # Formulário multi-step
├── Resultado.jsx             # Resultado visual
├── HistoricoDiagnosticos.jsx # Lista de diagnósticos
└── components/
    ├── EtapaDescoberta.jsx   # Etapa 1
    ├── EtapaDados.jsx        # Etapa 2
    ├── EtapaArquitetura.jsx  # Etapa 3
    ├── EtapaImplementacao.jsx
    ├── EtapaAvaliacao.jsx
    ├── EtapaDeploy.jsx
    ├── EtapaGovernanca.jsx
    └── ResultadoVisual.jsx   # Visualização com Recharts
```

#### Fluxo do Formulário

```jsx
// Formulario.jsx
export default function Formulario() {
  const { id } = useParams();
  const { diagnostico, salvarResposta } = useDiagnostico(id);
  const [etapaAtual, setEtapaAtual] = useState(1);
  
  const etapas = [
    { numero: 1, nome: 'Descoberta', component: EtapaDescoberta },
    { numero: 2, nome: 'Dados', component: EtapaDados },
    // ... demais etapas
  ];
  
  const handleNext = async (respostas) => {
    await salvarResposta({ 
      etapa: etapas[etapaAtual - 1].nome.toLowerCase(),
      respostas 
    });
    
    if (etapaAtual < etapas.length) {
      setEtapaAtual(prev => prev + 1);
    } else {
      // Finalizar e redirecionar para resultado
      navigate(`/diagnostico/${id}/resultado`);
    }
  };
  
  const EtapaComponent = etapas[etapaAtual - 1].component;
  
  return (
    <Container>
      <FormProgress atual={etapaAtual} total={etapas.length} />
      <EtapaComponent 
        respostas={diagnostico?.respostas}
        onNext={handleNext}
      />
      <FormNavigation 
        onBack={() => setEtapaAtual(prev => prev - 1)}
        canGoBack={etapaAtual > 1}
      />
    </Container>
  );
}
```

### 2.5 Visualização de Resultados

**Componentes de Visualização com Recharts**

```jsx
// ResultadoVisual.jsx
import { RadarChart, BarChart, LineChart } from 'recharts';

export default function ResultadoVisual({ diagnostico }) {
  const { scores, recomendacoes } = diagnostico;
  
  return (
    <div className="space-y-8">
      {/* Radar Chart - Maturidade por Etapa */}
      <Card>
        <CardHeader>
          <CardTitle>Maturidade por Macro-Etapa</CardTitle>
        </CardHeader>
        <CardContent>
          <RadarChart data={prepararDadosRadar(scores.porEtapa)}>
            {/* Configuração do radar */}
          </RadarChart>
        </CardContent>
      </Card>
      
      {/* Bar Chart - Níveis Organizacionais */}
      <Card>
        <CardHeader>
          <CardTitle>Níveis Organizacionais (L1-L12)</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={prepararDadosBar(scores.porNivel)}>
            {/* Configuração do bar */}
          </BarChart>
        </CardContent>
      </Card>
      
      {/* Recomendações */}
      <RecommendationCards recomendacoes={recomendacoes} />
      
      {/* Export PDF */}
      <Button onClick={() => exportarPDF(diagnostico)}>
        <Download className="mr-2 h-4 w-4" />
        Exportar Relatório (PDF)
      </Button>
    </div>
  );
}
```

### 2.6 Export PDF

**`src/lib/pdf/diagnosticoExport.js`**

```javascript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportarRelatorioPDF(diagnostico) {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Página 1: Resumo Executivo
  pdf.setFontSize(20);
  pdf.text('Relatório de Diagnóstico LLMOps', 20, 20);
  
  pdf.setFontSize(12);
  pdf.text(`Data: ${new Date(diagnostico.completedAt).toLocaleDateString('pt-BR')}`, 20, 30);
  pdf.text(`Score Geral: ${diagnostico.scores.geral.toFixed(1)}/10`, 20, 37);
  
  // Capturar gráficos como imagem
  const chartsElement = document.getElementById('charts-container');
  const canvas = await html2canvas(chartsElement);
  const imgData = canvas.toDataURL('image/png');
  
  pdf.addPage();
  pdf.addImage(imgData, 'PNG', 10, 10, 190, 100);
  
  // Adicionar recomendações
  pdf.addPage();
  pdf.setFontSize(16);
  pdf.text('Arquiteturas Recomendadas', 20, 20);
  
  diagnostico.recomendacoes.arquiteturas.forEach((arq, idx) => {
    pdf.setFontSize(12);
    pdf.text(`${idx + 1}. ${arq}`, 25, 30 + (idx * 10));
  });
  
  pdf.save(`diagnostico-llmops-${Date.now()}.pdf`);
}
```

---

## FASE 3: Galeria de Arquiteturas Interativas

### 3.1 Setup React Flow

**Dependências**

```json
{
  "dependencies": {
    "reactflow": "^11.10.4",
    "elkjs": "^0.9.1",
    "html-to-image": "1.11.11"
  }
}
```

### 3.2 Estrutura de Dados para Arquiteturas

**`src/data/arquiteturas/`**

```
arquiteturas/
├── rag.js                    # Arquitetura RAG
├── rag-plus.js               # RAG avançado
├── fine-tuning.js            # Fine-tuning
├── agentes.js                # Multi-agentes
├── prompt-only.js            # Prompt engineering
└── index.js                  # Exportações
```

#### Exemplo de Estrutura de Arquitetura

```javascript
// rag.js
export const arquiteturaRAG = {
  id: 'rag',
  nome: 'RAG - Retrieval-Augmented Generation',
  descricao: 'Combina recuperação de documentos com geração de texto',
  nivel: 'intermediario',
  custoEstimado: 'medio',
  complexidade: 'media',
  
  // Nós do diagrama React Flow
  nodes: [
    {
      id: '1',
      type: 'custom',
      position: { x: 100, y: 100 },
      data: {
        label: 'Ingestão de Dados',
        tipo: 'entrada',
        descricao: 'Coleta e pré-processamento de documentos',
        metricas: ['Volume de docs', 'Taxa de sucesso'],
        ferramentas: ['Apache Airflow', 'Fivetran'],
        riscos: ['Qualidade de dados', 'Escalabilidade'],
        entregas: ['Pipeline documentado', 'Dados validados']
      }
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 300, y: 100 },
      data: {
        label: 'Embedding',
        tipo: 'processamento',
        descricao: 'Conversão de texto em vetores',
        metricas: ['Dimensionalidade', 'Throughput'],
        ferramentas: ['OpenAI Embeddings', 'Sentence Transformers'],
        riscos: ['Custo de API', 'Latência'],
        entregas: ['Modelo escolhido', 'Testes de qualidade']
      }
    },
    // ... mais nós
  ],
  
  // Conexões
  edges: [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'smoothstep',
      animated: true,
      label: 'Documentos processados'
    },
    // ... mais edges
  ],
  
  // Metadata para recomendações
  casosDeUso: [
    'FAQ/Chatbot com conhecimento específico',
    'Documentação técnica assistida',
    'Análise de contratos'
  ],
  
  prerequisitos: {
    dados: 'Documentos estruturados ou semi-estruturados',
    time: 'Eng. de dados + ML Engineer',
    orcamento: 'Médio (uso de APIs de embedding)'
  }
};
```

### 3.3 Componentes React Flow

**`src/components/reactflow/`**

```
reactflow/
├── ArchitectureDiagram.jsx   # Componente principal do diagrama
├── CustomNode.jsx            # Nó customizado
├── NodePopup.jsx             # Popup de detalhes do nó
├── MiniMap.jsx               # Mini-mapa
├── Controls.jsx              # Controles customizados
├── ComparisonView.jsx        # Comparação lado a lado
└── ExportButton.jsx          # Botão de exportar
```

#### Componente Principal

```jsx
// ArchitectureDiagram.jsx
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function ArchitectureDiagram({ arquitetura, onNodeClick }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(arquitetura.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(arquitetura.edges);
  
  const nodeTypes = {
    custom: CustomNode
  };
  
  return (
    <div className="h-[600px] w-full rounded-lg border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(event, node) => onNodeClick(node.data)}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        
        <Panel position="top-right">
          <ExportButton arquitetura={arquitetura} />
        </Panel>
      </ReactFlow>
    </div>
  );
}
```

#### Nó Customizado

```jsx
// CustomNode.jsx
import { Handle, Position } from 'reactflow';

export default function CustomNode({ data }) {
  const tipoColors = {
    entrada: 'bg-blue-100 border-blue-500',
    processamento: 'bg-purple-100 border-purple-500',
    armazenamento: 'bg-green-100 border-green-500',
    saida: 'bg-orange-100 border-orange-500'
  };
  
  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${tipoColors[data.tipo]} min-w-[200px]`}>
      <Handle type="target" position={Position.Top} />
      
      <div className="font-semibold text-sm mb-1">{data.label}</div>
      <div className="text-xs text-muted-foreground">{data.descricao}</div>
      
      {data.metricas && (
        <div className="mt-2 flex flex-wrap gap-1">
          {data.metricas.slice(0, 2).map(metrica => (
            <Badge key={metrica} variant="outline" className="text-xs">
              {metrica}
            </Badge>
          ))}
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
```

#### Popup de Detalhes

```jsx
// NodePopup.jsx
export default function NodePopup({ nodeData, onClose }) {
  return (
    <Dialog open={!!nodeData} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{nodeData?.label}</DialogTitle>
          <DialogDescription>{nodeData?.descricao}</DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="metricas">
          <TabsList>
            <TabsTrigger value="metricas">Métricas</TabsTrigger>
            <TabsTrigger value="ferramentas">Ferramentas</TabsTrigger>
            <TabsTrigger value="riscos">Riscos</TabsTrigger>
            <TabsTrigger value="entregas">Entregas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metricas">
            <ul className="space-y-2">
              {nodeData?.metricas?.map(metrica => (
                <li key={metrica} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  {metrica}
                </li>
              ))}
            </ul>
          </TabsContent>
          
          {/* Demais tabs */}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
```

### 3.4 Comparação Lado a Lado

```jsx
// ComparisonView.jsx
import { ReactFlowProvider } from 'reactflow';

export default function ComparisonView({ arq1, arq2 }) {
  const [syncedViewport, setSyncedViewport] = useState({ x: 0, y: 0, zoom: 1 });
  
  const handleMove = (viewport) => {
    setSyncedViewport(viewport);
  };
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{arq1.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactFlowProvider>
            <ArchitectureDiagram 
              arquitetura={arq1} 
              viewport={syncedViewport}
              onMove={handleMove}
            />
          </ReactFlowProvider>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{arq2.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactFlowProvider>
            <ArchitectureDiagram 
              arquitetura={arq2}
              viewport={syncedViewport}
              onMove={handleMove}
            />
          </ReactFlowProvider>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 3.5 Export de Imagem

**`src/lib/reactflow/exportImage.js`**

```javascript
import { toPng } from 'html-to-image';

export async function exportarDiagrama(elementId, nomeArquitetura) {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error('Elemento não encontrado');
  }
  
  try {
    const dataUrl = await toPng(element, {
      backgroundColor: '#ffffff',
      quality: 0.95,
      pixelRatio: 2 // Higher quality
    });
    
    // Download
    const link = document.createElement('a');
    link.download = `arquitetura-${nomeArquitetura}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Erro ao exportar:', error);
    throw error;
  }
}
```

### 3.6 Salvamento de Diagramas do Usuário (Preparação Fase 4)

**Estrutura Firestore para Diagramas**

```
diagramas_usuario/
  {diagramaId}/
    - userId
    - nome
    - descricao
    - tipo ('referencia' | 'customizado')
    - arquiteturaBaseId (se baseado em referência)
    - reactFlowJson: { nodes: [...], edges: [...], viewport: {...} }
    - tags: []
    - createdAt
    - updatedAt
    - thumbnail (URL ou base64)
```

---

## ESTRUTURA DE ARQUIVOS ATUALIZADA

```
src/
├── components/
│   ├── forms/                # NOVO - Componentes de formulário
│   ├── reactflow/            # NOVO - Componentes React Flow
│   └── ... (existentes)
├── data/
│   ├── arquiteturas/         # NOVO - Definições de arquiteturas
│   ├── blogPosts.js          # NOVO - Posts estruturados
│   ├── guiaEtapas.js         # NOVO - Etapas estruturadas
│   └── glossary.json
├── hooks/
│   ├── useDiagnostico.js     # NOVO - Hook diagnóstico
│   ├── useArchitecture.js    # NOVO - Hook arquiteturas
│   └── useFirestore.js       # NOVO - Hook genérico Firestore
├── lib/
│   ├── diagnostico/          # NOVO - Lógica de diagnóstico
│   ├── pdf/                  # NOVO - Export PDF
│   ├── reactflow/            # NOVO - Utilidades React Flow
│   ├── firestore/            # NOVO - Helpers Firestore
│   └── ... (existentes)
├── pages/
│   ├── Diagnostico/          # ATUALIZADO - Páginas diagnóstico
│   ├── Arquiteturas/         # ATUALIZADO - Galeria arquiteturas
│   └── ... (existentes)
```

---

## CHECKLIST DE IMPLEMENTAÇÃO

### Fase 2: Diagnóstico

- [ ] Configurar regras de segurança Firestore
- [ ] Criar serviços Firestore (CRUD diagnósticos)
- [ ] Implementar hook `useDiagnostico`
- [ ] Criar componentes de formulário base
- [ ] Implementar banco de perguntas estruturado
- [ ] Desenvolver motor de pontuação
- [ ] Desenvolver motor de recomendações
- [ ] Criar páginas de fluxo (Novo, Formulário, Resultado, Histórico)
- [ ] Implementar visualizações com Recharts
- [ ] Adicionar funcionalidade de export PDF
- [ ] Implementar auto-save
- [ ] Testes de fluxo completo

### Fase 3: Arquiteturas

- [ ] Instalar e configurar React Flow
- [ ] Criar definições de arquiteturas (RAG, Fine-tuning, etc.)
- [ ] Implementar componente `ArchitectureDiagram`
- [ ] Criar nó customizado com estilos
- [ ] Implementar popup de detalhes de nó
- [ ] Adicionar comparação lado a lado
- [ ] Implementar export de imagem (PNG)
- [ ] Configurar auto-layout (ELK.js opcional)
- [ ] Criar galeria de arquiteturas
- [ ] Preparar estrutura para salvamento (Fase 4)
- [ ] Testes de interatividade

---

## PRÓXIMOS PASSOS PÓS FASE 2-3

**Fase 4: Laboratório**

- Drag & drop de blocos do sidebar
- Validação de conexões
- Playbooks pré-configurados
- Salvar diagramas customizados no Firestore
- Compartilhamento de diagramas

**Melhorias Contínuas**

- Sistema de notificações
- Dashboard do usuário
- Analytics de uso
- Integração com ferramentas externas
- API pública para exportar dados

### To-dos

- [ ] Configurar Firestore: regras de segurança, collections, índices
- [ ] Criar serviços Firestore (CRUD para diagnósticos e usuários)
- [ ] Implementar biblioteca de componentes de formulário (QuestionCard, RadioGroup, etc.)
- [ ] Criar hook useDiagnostico com React Query e mutations
- [ ] Desenvolver motor de pontuação (scores por etapa e nível)
- [ ] Desenvolver motor de recomendações (arquiteturas, próximos passos)
- [ ] Implementar páginas de diagnóstico (Formulário multi-step, Resultado, Histórico)
- [ ] Criar visualizações de resultado com Recharts (Radar, Bar charts)
- [ ] Implementar export de relatório em PDF (jsPDF + html2canvas)
- [ ] Instalar e configurar React Flow + dependências (elkjs, html-to-image)
- [ ] Criar definições de arquiteturas (RAG, Fine-tuning, Agentes, etc.)
- [ ] Implementar componentes React Flow (CustomNode, NodePopup, ArchitectureDiagram)
- [ ] Criar galeria de arquiteturas com filtros e navegação
- [ ] Implementar comparação lado a lado de arquiteturas
- [ ] Adicionar funcionalidade de exportar diagrama como PNG