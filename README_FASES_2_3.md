# Plataforma LLMOps - Fases 2 e 3

## 🎯 O que foi implementado

### Fase 2: Diagnóstico & Formulários Inteligentes ✅

Sistema completo de diagnóstico de maturidade LLMOps com:
- ✅ Formulário multi-etapas (7 etapas)
- ✅ Motor de pontuação inteligente
- ✅ Recomendações personalizadas de arquiteturas
- ✅ Visualizações interativas (Radar + Bar charts)
- ✅ Export de relatório em PDF

### Fase 3: Galeria de Arquiteturas Interativas ✅

Exploração visual de arquiteturas LLMOps com:
- ✅ 3 arquiteturas de referência (RAG, Fine-tuning, Prompt-only)
- ✅ Diagramas interativos com React Flow
- ✅ Nós clicáveis com detalhes (métricas, ferramentas, riscos)
- ✅ Comparação lado a lado
- ✅ Export de diagramas em PNG

---

## 🚀 Como Rodar

### 1. Pré-requisitos

- Node.js 18+ e npm
- Conta Firebase (gratuita)

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Firebase

#### a) Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Siga o wizard de criação

#### b) Habilitar Firestore

1. No menu lateral, vá em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha modo "Produção"
4. Selecione a localização (ex: `southamerica-east1`)

#### c) Habilitar Authentication

1. No menu lateral, vá em "Authentication"
2. Clique em "Começar"
3. Ative "E-mail/senha"
4. Ative "Google" (opcional)

#### d) Obter Credenciais

1. Vá em Configurações do Projeto (ícone de engrenagem)
2. Em "Seus aplicativos", clique no ícone web `</>`
3. Registre um app (nome: "LLMOps Platform")
4. Copie as credenciais fornecidas

#### e) Configurar Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4. Deploy das Regras de Segurança

#### Opção A: Via Firebase CLI (Recomendado)

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar projeto (apenas Firestore)
firebase init firestore

# Deploy das regras
firebase deploy --only firestore:rules
```

#### Opção B: Via Console

1. Acesse Firestore Database → Regras
2. Cole o conteúdo de `firestore.rules`
3. Clique em "Publicar"

### 5. Rodar em Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

## 📱 Como Usar a Plataforma

### 1. Criar Conta

1. Clique em "Cadastrar"
2. Preencha e-mail e senha
3. Ou use "Entrar com Google"

### 2. Realizar Diagnóstico

1. Vá para "Diagnóstico" no menu
2. Clique em "Começar Agora"
3. Responda as 7 etapas:
   - Descoberta & Alinhamento
   - Dados & Contexto
   - Arquitetura & Desenho
   - Implementação
   - Avaliação & Testes
   - Deploy & Observabilidade
   - Governança
4. Ao final, veja o resultado com:
   - Score geral de maturidade
   - Gráficos de radar (por etapa)
   - Gráficos de barras (níveis L1-L12)
   - Arquiteturas recomendadas
   - Próximos passos prioritários
   - Riscos identificados
5. Exporte o relatório em PDF

### 3. Explorar Arquiteturas

1. Vá para "Arquiteturas" no menu
2. Veja a galeria de arquiteturas disponíveis
3. Use filtros por:
   - Nível (iniciante, intermediário, avançado)
   - Custo (baixo, médio, alto)
   - Complexidade (baixa, média, alta)
4. Clique em uma arquitetura para ver detalhes:
   - Diagrama interativo
   - Casos de uso
   - Pré-requisitos
   - Vantagens e desvantagens
5. Clique nos nós do diagrama para ver:
   - Métricas
   - Ferramentas
   - Riscos
   - Entregas
6. Exporte o diagrama em PNG

### 4. Comparar Arquiteturas

1. Na galeria, clique em até 2 arquiteturas
2. Clique em "Comparar"
3. Veja lado a lado:
   - Tabela de comparação
   - Diagramas
   - Vantagens
   - Desvantagens

---

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── forms/                  # Componentes de formulário
│   │   ├── FormProgress.jsx
│   │   ├── FormNavigation.jsx
│   │   ├── RadioInput.jsx
│   │   ├── CheckboxInput.jsx
│   │   ├── ScaleInput.jsx
│   │   └── TextAreaInput.jsx
│   ├── diagnostico/            # Componentes de diagnóstico
│   │   ├── EtapaFormulario.jsx
│   │   └── ResultadoVisual.jsx
│   ├── reactflow/              # Componentes React Flow
│   │   ├── CustomNode.jsx
│   │   ├── NodePopup.jsx
│   │   ├── ArchitectureDiagram.jsx
│   │   └── ExportButton.jsx
│   └── ui/                     # Componentes UI base
├── data/
│   └── arquiteturas/           # Definições de arquiteturas
│       ├── rag.js
│       ├── fine-tuning.js
│       ├── prompt-only.js
│       └── index.js
├── hooks/
│   └── useDiagnostico.js       # Hook de gerenciamento
├── lib/
│   ├── firestore/              # Serviços Firestore
│   │   ├── diagnosticoService.js
│   │   └── userService.js
│   ├── diagnostico/            # Lógica de diagnóstico
│   │   ├── questions.js
│   │   ├── scoringEngine.js
│   │   └── recommendationEngine.js
│   ├── pdf/
│   │   └── diagnosticoExport.js
│   └── reactflow/
│       └── exportImage.js
└── pages/
    ├── Diagnostico/
    │   ├── index.jsx
    │   ├── Formulario.jsx
    │   └── Resultado.jsx
    └── Arquiteturas/
        ├── index.jsx
        ├── Detalhes.jsx
        └── Comparacao.jsx
```

---

## 🎨 Tecnologias Utilizadas

### Frontend
- **React 18** - Framework UI
- **Vite** - Build tool
- **React Router v6** - Roteamento
- **Tailwind CSS** - Styling
- **shadcn/ui** - Componentes UI
- **Radix UI** - Primitives acessíveis
- **Framer Motion** - Animações

### Dados e Estado
- **Firebase Firestore** - Banco de dados
- **Firebase Auth** - Autenticação
- **React Query** - Cache e sincronização
- **Zustand** - Estado global

### Visualizações
- **Recharts** - Gráficos (radar, bar)
- **React Flow** - Diagramas interativos

### Export
- **jsPDF** - Geração de PDF
- **html2canvas** - Captura de HTML
- **html-to-image** - Export de diagramas

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Formatação
npm run format
```

---

## 🗄️ Estrutura de Dados

### Diagnósticos

Cada diagnóstico possui:
- **respostas**: JSONB com respostas por etapa
- **scores**: Pontuações calculadas (por etapa, por nível, geral)
- **recomendacoes**: Arquiteturas, passos, recursos e riscos

### Arquiteturas

Cada arquitetura contém:
- **nodes**: Array de nós do diagrama (label, tipo, descrição, métricas, ferramentas, riscos, entregas)
- **edges**: Array de conexões entre nós
- **metadados**: Nível, custo, complexidade, tempo, casos de uso, pré-requisitos, vantagens, desvantagens

---

## 🆘 Troubleshooting

### Erro: "Firebase não configurado"

**Solução**: Verifique se o arquivo `.env.local` existe e tem todas as variáveis

### Erro: "Permission denied" no Firestore

**Solução**: 
1. Verifique se as regras de segurança foram publicadas
2. Certifique-se de estar logado
3. Confirme que o usuário está autenticado

### Erro: "Failed to export diagram"

**Solução**:
1. Certifique-se de estar usando `html-to-image@1.11.11`
2. Tente novamente após o diagrama carregar completamente
3. Verifique o console para erros específicos

### PDF não gera os gráficos

**Solução**:
1. Aguarde os gráficos renderizarem antes de exportar
2. Verifique se o elemento `charts-container` existe
3. Tente em navegador diferente (Chrome recomendado)

---

## 📚 Documentação Adicional

- **Implementação completa**: Ver `FASES_2_3_IMPLEMENTACAO.md`
- **Planejamento original**: Ver `.cursor/PLANEJAMENTO.md`
- **Configuração avançada**: Ver `README.md` (original)

---

## 🎯 Próximas Funcionalidades (Fase 4)

- Laboratório "Monte sua Arquitetura"
- Drag & drop de blocos
- Validação de conexões
- Salvamento de diagramas customizados
- Playbooks pré-configurados
- Compartilhamento de diagramas

---

## 📝 Notas Importantes

### Modularidade
- Todas as perguntas estão em `src/lib/diagnostico/questions.js` - fácil de editar
- Novas arquiteturas podem ser adicionadas em `src/data/arquiteturas/`
- Motores de pontuação e recomendação são funções puras - fácil de testar

### Performance
- React Query faz cache automático de diagnósticos
- Lazy loading de páginas
- Code splitting automático pelo Vite

### Segurança
- Regras Firestore impedem acesso não autorizado
- Dados do usuário protegidos por UID
- Validação server-side via regras

---

## 🤝 Contribuindo

Para adicionar novas funcionalidades:

1. **Nova arquitetura**: Criar arquivo em `src/data/arquiteturas/`
2. **Nova pergunta**: Editar `src/lib/diagnostico/questions.js`
3. **Nova regra de recomendação**: Editar `recommendationEngine.js`
4. **Novo componente UI**: Criar em `src/components/ui/`

---

## 📄 Licença

MIT License - Veja LICENSE para detalhes

---

**Desenvolvido com ❤️ para democratizar o conhecimento em LLMOps**

