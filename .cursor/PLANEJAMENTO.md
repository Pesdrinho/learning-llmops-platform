> **Pilares conceituais que vão orientar todo o produto**
> As **macro‑etapas do pipeline** e os **níveis de organização L1–L12** que você definiu serão a espinha dorsal de conteúdo, questionários e navegação. Eles já mapeiam decisões, métricas, governança e "gates" por etapa — use isso para guiar a IA de formulários, os pop‑ups de nós no diagrama e as recomendações finais ao usuário.   

---

## FASE 0 — Fundação de Frontend (Design System, roteamento, acessibilidade, SEO)

**Objetivo.** Sair com um app React (SPA) robusto, com design system consistente (tema, tipografia, tokens), acessível e pronto para crescer.

**Stack & decisões técnicas**

* **React 18** com **React Router v6** para roteamento client-side, **React Helmet Async** para SEO dinâmico, **React Query (TanStack Query)** para cache e sincronização de dados.
* **Build & Bundle**: **Vite** para desenvolvimento rápido e build otimizado, com **PWA Plugin** para service worker e cache offline.
* **UI**: **shadcn/ui** + **Radix Primitives** sobre **Tailwind** (tokens customizados, dark mode, componentes acessíveis).
* **Animações**: **Framer Motion** para microinterações (entradas de cards, toasts, drawers) — com parcimônia.
* **Ícones**: **Lucide** (tree‑shakable) e/ou **Heroicons**.
* **Acessibilidade**: seguir **WCAG 2.2**, usar ARIA APG para padrões (accordion, dialog, tabs, menubar).
* **SEO**: metadados dinâmicos via React Helmet, **prerendering** com **React Snap** ou **Puppeteer** para páginas estáticas, **sitemap.xml** gerado automaticamente.
* **Analytics**: **Plausible** (privacy‑friendly) e/ou **PostHog** (eventos e funis).
* **LGPD/Consentimento**: banner de cookies com botão de "Rejeitar tudo" no primeiro nível, política de cookies e base legal conforme guias **ANPD**.

**Componentes essenciais**

* Layout raiz com **Loading Bar** (barra sutil no topo em navegações), **Skip‑to‑content**, navegação colante, footer com políticas.
* Biblioteca de **MDX components** (Callout/Admonition, Steps, CodeBlocks com highlight, Tabela de Conteúdos com scroll‑spy). (Shiki/Prism a critério).
* Tema tipográfico e spacing tokens (Design Tokens).
* **Error Boundaries** para captura de erros e fallbacks elegantes.

**Critérios de aceite**

* Lighthouse ≥ 90 (Performance, A11y, Best Practices, SEO). Meta tags dinâmicas funcionam por página. Menu/tablist/dialog seguem APG. Estrutura de dados JSON-LD validada.

---

## FASE 1 — Autenticação + Páginas de Conteúdo (texto, imagens, áudio/vídeo)

**Objetivo.** Lançar a casca do produto: login básico (e‑mail/senha + Google via Firebase), páginas de conteúdo (Blog/Guia/Podcast).

**Stack & decisões técnicas**

* **Auth**: **Firebase Authentication** (e‑mail/senha + Google). **Context API + useAuth hook** para gerenciar estado de autenticação globalmente, **Protected Routes** com React Router.
* **Estado Global**: **Zustand** para gerenciamento de estado leve e performático, com **persist middleware** para dados do usuário.
* **Conteúdo**: **MDX + Vite plugin** para processar conteúdo markdown no build. Futuro: acoplar um CMS (Sanity/Strapi) via API sem mudar a UI.
* **Mídia**:
  * Vídeo: **Plyr** ou **Video.js** (controles acessíveis); se quiser streaming HLS/DRM depois, **Mux Player**.
  * Áudio/Podcast: **WaveSurfer.js** para "waveform" + **Media Session API** para controles no lockscreen/OS; publicar **RSS** do podcast.
* **Acessibilidade de mídia**: transcrições, legendas, descrição de áudio conforme W3C/WAI.

**Experiências de UX para elevar a percepção de qualidade**

* **Reading progress** no topo de posts longos (barra sutil) usando **Intersection Observer**.
* **Tabela de Conteúdos** ancorada (scroll‑spy) e **componentes Callout** (Info/Warning/Pro Tip) para destacar ideias.
* **Atalhos de teclado** nos players e **MediaSession** com capa/título (bom para mobile).
* **Lazy loading** de imagens e componentes com **React.lazy** e **Suspense**.

**Critérios de aceite**

* Login, logout, proteção de rotas, recuperação de senha e SSO Google funcionam. Estado de autenticação persistido no localStorage.
* Posts em MDX com ToC, code highlight, imagens responsivas e áudio/vídeo com transcrição.

---

## FASE 2 — Diagnóstico & Formulários "Inteligentes" ✅ IMPLEMENTADO

**Objetivo.** Capturar **maturidade digital** e **necessidades** para recomendar **arquiteturas/recursos** com base no seu framework (macro‑etapas + L1–L12).

**Decisões técnicas**

* **Builder**: Implementado com componentes React customizados (RadioInput, CheckboxInput, ScaleInput, TextAreaInput) sem bibliotecas de formulário externas para máxima flexibilidade.
* **Modelo de dados** (Firebase Firestore): 
  * Collection `diagnosticos` com estrutura modular: `userId`, `etapaAtual`, `status`, `respostas` (JSONB), `scores` (porEtapa, porNivel, geral), `recomendacoes`, `metadados`
  * Regras de segurança Firestore implementadas com funções helper `isAuthenticated()` e `isOwner()`
* **Lógica de recomendação**: 
  * Motor de pontuação (`scoringEngine.js`) com cálculo por etapa e níveis L1-L12
  * Motor de recomendações (`recommendationEngine.js`) com regras determinísticas mapeando respostas para arquiteturas (RAG, Fine-tuning, Prompt-only, Agentes)
  * Geração automática de próximos passos e identificação de riscos
* **Persistência**: **React Query** (`useDiagnostico` hook) para cache e sincronização com Firestore

**UX que ajuda a converter**

* **Formulário multi-etapas** (7 etapas): Descoberta, Dados, Arquitetura, Implementação, Avaliação, Deploy, Governança
* **Resumo visual** com **Recharts**: Radar chart (maturidade por etapa), Bar chart (níveis L1-L12)
* **Cards de recomendações**: Arquiteturas, próximos passos, recursos e alertas de risco
* **Exportar PDF** usando **jsPDF** + **html2canvas** com páginas de resumo, gráficos, recomendações e riscos
* **Validação em tempo real** com feedback visual de erros
* **Direcionamento de público** em cada etapa do formulário

**Implementação**

* **Serviços Firestore**: `diagnosticoService.js`, `userService.js`
* **Hooks**: `useDiagnostico.js`, `useDiagnosticos.js`
* **Componentes de formulário**: FormProgress, FormNavigation, QuestionCard, RadioInput, CheckboxInput, ScaleInput, TextAreaInput
* **Componentes de diagnóstico**: EtapaFormulario, ResultadoVisual
* **Páginas**: Diagnostico/index, Diagnostico/Formulario, Diagnostico/Resultado
* **Banco de perguntas**: `questions.js` com 7 etapas e perguntas estruturadas com pesos e validações
* **PDF Export**: `diagnosticoExport.js` com formatação profissional e múltiplas páginas

**Critérios de aceite**

✅ Fluxo multi‑passos (7 etapas) com validação e navegação  
✅ Salvamento automático no Firestore por etapa  
✅ Relatório com: scores por etapa, scores por nível L1-L12, score geral, arquiteturas recomendadas, próximos passos, riscos identificados  
✅ Visualizações interativas com Recharts  
✅ Export PDF completo 

---

## FASE 3 — Exploração de Arquiteturas (visual e interativa, com **React Flow**) ✅ IMPLEMENTADO

**Objetivo.** Oferecer uma **galeria de arquiteturas** (RAG, Prompt‑Only, Fine‑tuning/SLM) com **nós clicáveis** que abrem pop‑ups explicativos (com métricas, riscos, ferramentas e "entregáveis") e **comparação lado a lado**.

**Stack & decisões técnicas**

* **React Flow 11**: Minimap, Controls, Background, Painéis customizados implementados
* **Custom nodes**: Componente `CustomNode` com cores por tipo (entrada, processamento, armazenamento, saída, monitoramento)
* **Node Popup**: Dialog modal com tabs para Métricas, Ferramentas, Riscos e Entregas
* **Comparação**: Duas instâncias independentes do React Flow em grid responsivo (sem sincronização de viewport por simplicidade)
* **Exportar imagem**: `html-to-image@1.11.11` (versão fixada) para exportação client-side como PNG

**Arquiteturas Implementadas**

1. **RAG (Retrieval-Augmented Generation)**: 13 nós, pipeline completo de ingestão → embedding → retrieval → geração
2. **Fine-tuning / SLM Especializado**: 9 nós, ciclo completo de coleta de dados → treinamento → deploy → retreinamento
3. **Prompt Engineering (APIs Black-box)**: 8 nós, abordagem simplificada com templates e guardrails

Cada arquitetura inclui:
* Nós detalhados com métricas, ferramentas, riscos e entregas
* Metadados: nível, custo estimado, complexidade, tempo de implementação
* Casos de uso específicos
* Pré-requisitos (dados, time, orçamento)
* Vantagens e desvantagens

**UX que encanta**

* **Galeria interativa** com filtros por nível, custo e complexidade
* **Seleção para comparação**: Clique em até 2 arquiteturas para comparar lado a lado
* **Nós clicáveis**: Popup com tabs organizadas (Métricas, Ferramentas, Riscos, Entregas)
* **Cores por tipo de nó**: Visual claro do fluxo de dados
* **MiniMap**: Navegação rápida em diagramas grandes
* **Export PNG**: Botão para baixar diagrama em alta qualidade

**Implementação**

* **Estrutura de dados**: `src/data/arquiteturas/` com definições modulares (rag.js, fine-tuning.js, prompt-only.js, index.js)
* **Componentes React Flow**: 
  * `CustomNode.jsx`: Nó customizado com badges de métricas
  * `NodePopup.jsx`: Modal com tabs para detalhes
  * `ArchitectureDiagram.jsx`: Componente principal do diagrama
  * `ExportButton.jsx`: Botão de exportação
* **Páginas**: 
  * `Arquiteturas/index.jsx`: Galeria com filtros e seleção
  * `Arquiteturas/Detalhes.jsx`: Página de detalhes com diagrama interativo
  * `Arquiteturas/Comparacao.jsx`: Comparação lado a lado
* **Utils**: `exportImage.js` com funções de exportação PNG

**Critérios de aceite**

✅ Galeria com 3 arquiteturas de referência (RAG, Fine-tuning, Prompt-only)  
✅ Filtros por nível, custo e complexidade  
✅ Nós clicáveis com popup de detalhes (métricas, ferramentas, riscos, entregas)  
✅ Página de detalhes individual por arquitetura  
✅ Comparação lado a lado de 2 arquiteturas  
✅ Exportar PNG do diagrama  
✅ Visual profissional com cores diferenciadas por tipo de nó  
✅ Estrutura preparada para salvamento futuro (Fase 4)

---

## FASE 4 — **Laboratório "Monte sua Arquitetura LLMOps"** (sem executar pipeline)

**Objetivo.** Um sandbox para o usuário **arrastar blocos** e **compor sua arquitetura**, baseado em **macro‑etapas pré‑definidas** e "blocos" de pipeline (ingestão, embeddings, vector DB, retriever, prompt builder, model router, evals, observabilidade etc.). **Sem** execução real de treino/inferência por enquanto.

**Stack & decisões técnicas**

* **React Flow** com **drag & drop** a partir de um **Sidebar de blocos**; **snap‑to‑grid** e **guides** para alinhamento; **validações** básicas (ex.: retriever precisa de índice; eval precisa de dataset).
* **Tipos de blocos**: mapeados às **macro‑etapas** e às arquiteturas do seu guia (RAG Pipeline, Prompt Registry, Model Serving/Router, Evals/Observability…). Cada bloco carrega `data` com **descrição**, **métricas**, **riscos**, **entregáveis** e **links**. 
* **Persistência**: salvar como **ReactFlowJsonObject** (localStorage + Firestore por usuário) para compartilhar/importar. Exportar como PNG.
* **Placeholders de upload**: mostrar o formato esperado de datasets (sem processar), com validação de extensão e tamanho — apenas UI para "futuro treinamento".
* **Estado**: **Zustand** com **subscriptions** para sincronizar mudanças em tempo real.

**UX que educa**

* **Checklist por etapa** conforme seu **Framework estratégico** (gates e "saídas obrigatórias"). **Badges** de "Completo/Parcial/Pendente" por macro‑etapa. 
* **Roteiros** ("Playbooks"): presets de arquiteturas (carregar um JSON pronto) acompanhados de um mini‑tutorial. 

**Critérios de aceite**

* Usuário consegue: arrastar blocos, conectar, ver pop‑ups e avisos de validação, salvar, carregar, duplicar diagramas e exportar imagem. Sem execução de pipeline.

---

## BUSCANDO UMA UI MAIS IMPACTANTE (comparado ao site‑referência)

**Sugestões visuais**

* **Hero interativo** com microanimações (Framer Motion) e um "demo gif" curto do diagrama; grid sutil, glass‑morphism moderado só em elementos flutuantes (popover, command palette).
* **Command Palette** (⌘K) usando **cmdk** para navegar por conceitos (Arquiteturas, Macro‑etapas, Níveis Lx, Glossário).
* **Reading progress**, **route progress** e **TOC** para reduzir abandono em texto longo.
* **Cards editoriais ricos** (post + audio clip + "minutos de leitura").
* **Glossário on‑hover** (seu dicionário CSV), e "**linhas de causalidade**" entre níveis Lx (top‑down/bottom‑up) nos pop‑ups — fortalece seu framework autoral. 

**Acessibilidade e mídia**

* Players com **atalhos**, **legendas** e **transcrição**; **Media Session API** para controles nativos no SO.

**Descoberta e busca**

* **Fuse.js** para busca client-side em artigos, arquiteturas e glossário; ou **MiniSearch** para indexação mais avançada; **React InstantSearch** se optar por Algolia.

---

## INTEGRAÇÕES E INFRA TRANSVERSAIS

* **SEO & Feeds**: `sitemap.xml` gerado automaticamente, `feed.xml` (RSS) para blog e podcast via build script.
* **Cache/Desempenho**: **React Query** para cache de dados, **Service Worker** via Vite PWA para cache de assets, **Code Splitting** com React.lazy.
* **PostHog/Plausible**: eventos "diagnostic_completed", "diagram_saved", "architecture_compare", "podcast_played_30s".
* **LGPD**: banner com **Rejeitar tudo** + granularidade no 2º nível; política de cookies e privacidade (modelo ANPD), link permanente no footer.

---

## MODELOS DE DADOS (mínimos para começar)

* `User`: uid, email, name, plan.
* `Content`: slug, title, summary, type (article|video|podcast|architecture), tags[], bodyMDX, media[].
* `GlossaryEntry`: term, shortDef, longDef, sources[].
* `DiagnosticSession`: userId, answers[], scores{byStage, byLevel}, recommendedArchitectures[], createdAt.
* `ArchitectureGraph`: userId, title, description, json(ReactFlowJsonObject), createdAt, tags[], thumbnail.

---

## ROTEIRO DE ENTREGA (linear)

**1) Fase 0–1 (frontend + auth + páginas)**

* App React com Vite, React Router, shadcn/ui, Radix, Tailwind. **React Helmet Async** para SEO dinâmico.
* Firebase Auth (e‑mail/senha + Google) com Context API e Protected Routes.
* MDX + Vite plugin; players (Plyr/WaveSurfer); transcrição; Media Session.
* LGPD: banner e páginas legais (privacidade/cookies).

**2) Fase 2 (diagnóstico)**

* Formulários com React Hook Form + Zod + Zustand; engine de pontuação e roteamento para recomendações alinhadas às **macro‑etapas** e aos **níveis Lx**.
* UI de relatório com Recharts, exportar PDF com jsPDF e gravação no Firestore.

**3) Fase 3 (exploração de arquiteturas)**

* Galeria com React Flow (5 arquiteturas) + pop‑ups de nós (conteúdo vindo do seu Guia/Framework). 
* **Comparação lado a lado** (resizable panels; sincronizar zoom/pan).
* Save/Restore (localStorage + Firestore); export PNG; auto‑layout opcional (ELK/Dagre).

**4) Fase 4 (laboratório de arquiteturas)**

* Biblioteca de blocos por **macro‑etapa**; drag & drop, validações e checklists; salvar/compartilhar.
* "Playbooks" (presets carregáveis) baseados no seu material.  

---

## CRITÉRIOS GERAIS DE ACEITE (por release)

* **A11y**: navegação por teclado, foco visível, ARIA correta em dialogs/menus/tabs, contraste ≥ AA.
* **SEO**: metadados dinâmicos, prerendering de páginas críticas, sitemap e RSS públicos.
* **LGPD**: banner "Rejeitar tudo" no 1º nível, política publicada, logs anonimizados; base legal informada no diagnóstico.
* **Perf**: Core Web Vitals OK; assets críticos lazy-loaded; service worker configurado para cache offline.

---

## RISCOS & MITIGAÇÕES

* **Undo/Redo/Copy‑Paste** no canvas: avaliar **React Flow Pro** ou implementar com Zustand/Zundo.
* **Export de imagem**: travar `html-to-image@1.11.11` (bug em versões recentes). Para imagens confiáveis (thumbnails/compartilhamento), usar API separada com Puppeteer.
* **SEO em SPA**: usar **React Snap** ou **Puppeteer** para prerendering de páginas críticas; considerar **React Server Components** no futuro se precisar de SSR completo.

---

## CONTEÚDOS DE APOIO (do seu acervo) PARA LIGAR À UI

* **Perguntas‑guia, gates e entregáveis** nas macro‑etapas (pop‑ups, checklists do lab, "próximos passos" do diagnóstico). 
* **Níveis L1–L12** (páginas de referência + tooltips + "efeitos de causa‑e‑efeito"). 
* **Arquiteturas de referência** (galeria e presets de laboratório). 
* **Responsible LLMOps** (seção de governança/risco nos pop‑ups e no diagnóstico). 

---

## BACKLOG (rápidos ganhos após o MVP)

* **Busca global** (Fuse.js/MiniSearch) com auto‑suggest, filtros por arquitetura, macro‑etapa, nível Lx e tipo de mídia.
* **Command Palette (⌘K)** com cmdk para navegar por termos do Glossário e abrir nós específicos da galeria com um atalho.
* **"Compartilhar arquitetura"**: link público que renderiza uma imagem estática do grafo via API.
* **Integração de analytics de conteúdo** (tempo de leitura real, scroll depth, playthrough de áudio/vídeo).
* **PWA completo**: instalação, notificações push, sincronização offline.

---

### O que o desenvolvedor precisa imediatamente

1. **Repositório** com React + Vite, React Router, Tailwind, shadcn/ui, Radix, Framer Motion, Plausible/PostHog.
2. **Setup Firebase** (Auth) e Context API para autenticação; Protected Routes com React Router.
3. **Design Tokens** e temas; layout base com Loading Bar, Skip to content e componentes MDX (Callout, ToC, CodeBlock).
4. **Páginas**: Home (hero + CTA), Blog (lista e post), Guia (macro‑etapas), Podcast (player + transcrição).
5. **Diagnóstico**: primeira trilha de perguntas (descoberta → arquitetura) com scoring e resumo usando Recharts. 
6. **Exploração**: primeira arquitetura (RAG) em React Flow com pop‑ups e export PNG; depois as demais.
7. **Laboratório**: biblioteca mínima de blocos (ingestão, embedding, vector DB, retriever, prompt builder, LLM/Router, evals/obs), drag & drop e salvar JSON.
8. **LGPD**: banner e páginas de políticas.
