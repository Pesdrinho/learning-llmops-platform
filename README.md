# Learning LLMOps Platform

Plataforma interativa para aprendizado e implementação de sistemas LLMOps, oferecendo conteúdo educacional, ferramentas de diagnóstico e visualizações de arquiteturas de referência.

## 🚀 Sobre o Projeto

Esta plataforma unifica conhecimento sobre LLMOps através de:

- **Guia Estratégico**: Framework completo com 7 macro-etapas e 12 níveis organizacionais
- **Blog**: Artigos técnicos e tutoriais sobre arquiteturas LLM
- **Podcast**: Conversas com especialistas sobre implementações reais
- **Diagnóstico** (Fase 2): Avaliação de maturidade organizacional
- **Galeria de Arquiteturas** (Fase 3): Visualizações interativas com React Flow
- **Laboratório** (Fase 4): Editor drag-and-drop para compor arquiteturas

## 📋 Status de Implementação

**✅ Fases 0-1 Completas:**
- Fundação frontend (design system, roteamento, SEO)
- Autenticação Firebase (e-mail/senha + Google)
- Páginas de conteúdo (Blog, Guia, Podcast)
- Componentes MDX (Callout, CodeBlock, ToC, Steps)
- Players de mídia (áudio/vídeo)
- LGPD/Cookies (banner e páginas legais)
- PWA básico

**🔜 Próximas Fases:**
- Fase 2: Diagnóstico & Formulários inteligentes
- Fase 3: Galeria de Arquiteturas (React Flow)
- Fase 4: Laboratório de Arquiteturas

## 🛠️ Stack Tecnológica

### Core
- **React 18** com Vite
- **React Router v6** para roteamento
- **TypeScript/JavaScript** (configurado para ambos)

### UI & Styling
- **Tailwind CSS** + PostCSS
- **shadcn/ui** + **Radix UI Primitives**
- **Framer Motion** para animações
- **Lucide React** para ícones

### Backend & Auth
- **Firebase** (Authentication + Firestore preparado)
- **Zustand** para estado global
- **React Query** (TanStack Query) para cache

### SEO & Performance
- **React Helmet Async** para metadados dinâmicos
- **Vite PWA Plugin** para service worker
- Code splitting com `React.lazy()`

### Mídia & Conteúdo
- **MDX** para posts com componentes React
- **Plyr/WaveSurfer.js** para players (simplificados)

## 📦 Instalação e Configuração

### Pré-requisitos

-   
- Conta no [Firebase](https://console.firebase.google.com/)

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/seu-usuario/learning-llmops-platform.git
cd learning-llmops-platform
```

### Passo 2: Instale as Dependências

```bash
npm install
```

Se houver algum problema com dependências, execute:

```bash
npm install --legacy-peer-deps
```

### Passo 3: Configure o Firebase

#### 3.1 Crie um Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome: `learning-llmops-platform` (ou outro)
4. **Desabilite** Google Analytics (pode ativar depois)
5. Clique em "Criar projeto"

#### 3.2 Configure Authentication

1. No menu lateral → **Authentication** → "Get started"
2. Na aba **Sign-in method**, habilite:
   - **E-mail/senha**: Ative e salve
   - **Google**: Ative, configure e-mail de suporte e salve
3. Em **Settings** → **Authorized domains**, adicione `localhost` (já vem por padrão)

#### 3.3 Configure Firestore (preparação para Fase 2+)

1. Menu lateral → **Firestore Database** → "Criar banco de dados"
2. Escolha **"Iniciar em modo de teste"**
3. Localização: `southamerica-east1` (São Paulo) ou mais próxima
4. Clique em "Ativar"

#### 3.4 Obtenha as Credenciais

1. Ícone de **engrenagem** → "Configurações do projeto"
2. Role até **"Seus aplicativos"** → clique no ícone `</>` (Web)
3. Registre o app: `llmops-web-app`
4. **NÃO** marque Firebase Hosting
5. Copie o objeto `firebaseConfig`

### Passo 4: Configure Variáveis de Ambiente

Crie um arquivo `.env.local` na **raiz do projeto** com o seguinte conteúdo (substitua com suas credenciais Firebase):

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

⚠️ **Importante**: O arquivo `.env.local` está no `.gitignore` e **não** será commitado.

### Passo 5: Execute o Projeto

```bash
npm run dev
```

O projeto estará disponível em **`http://localhost:5173`**

## 🎨 Estrutura de Diretórios

```
learning-llmops-platform/
├── public/
│   ├── icons/              # Ícones PWA (criar 192x192 e 512x512)
│   ├── images/             # Imagens públicas
│   └── manifest.json
├── src/
│   ├── assets/             # Assets estáticos
│   ├── components/
│   │   ├── auth/           # LoginForm, SignUpForm, etc.
│   │   ├── layout/         # Header, Footer, Container
│   │   ├── mdx/            # Callout, CodeBlock, ToC, Steps
│   │   ├── media/          # AudioPlayer, VideoPlayer, Transcript
│   │   ├── ui/             # shadcn/ui components
│   │   ├── CookieBanner.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── LoadingBar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── SEO.jsx
│   ├── content/
│   │   ├── blog/           # Posts MDX (criar aqui)
│   │   ├── guia/           # Macro-etapas MDX
│   │   └── podcast/        # Episódios MDX
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── data/
│   │   └── glossary.json   # Glossário LLMOps
│   ├── hooks/              # Custom hooks
│   ├── lib/
│   │   ├── firebase.js     # Config Firebase
│   │   ├── storage.js      # localStorage + prep Firestore
│   │   └── utils.js        # Utilities
│   ├── pages/              # Todas as páginas
│   ├── store/              # Zustand stores (futuro)
│   ├── styles/
│   │   ├── tokens.js       # Design tokens
│   │   └── globals.css     # Estilos globais
│   ├── App.jsx             # Rotas
│   └── main.jsx            # Entry point
├── .env.local              # Variáveis de ambiente (CRIAR)
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 📝 Como Adicionar Conteúdo

### Criar Posts no Blog

1. Crie um arquivo `.mdx` em `src/content/blog/`:

```mdx
---
title: "Título do Post"
slug: "titulo-do-post"
date: "2025-01-20"
author: "Seu Nome"
tags: ["llmops", "rag"]
image: "/images/blog/post.jpg"
summary: "Resumo do post"
---

# Título

Seu conteúdo aqui com **componentes MDX**!

<Callout type="info" title="Nota">
  Isso é um callout!
</Callout>
```

2. Adicione à lista em `src/pages/Blog/index.jsx`

### Criar Episódios de Podcast

Estrutura similar aos posts, adicionando campos como `audioUrl`, `duracao`, `convidado`.

### Editar Macro-etapas

Edite os dados mock em `src/pages/Guia/MacroEtapa.jsx` ou crie arquivos MDX em `src/content/guia/`.

## 🖼️ Adicionar Imagens

### Ícones PWA

Crie ícones PNG em:
- `public/icons/icon-192x192.png` (192x192px)
- `public/icons/icon-512x512.png` (512x512px)

Recomendação: Use [Favicon Generator](https://realfavicongenerator.net/)

### Imagens de Conteúdo

Coloque em `public/images/`:
- `public/images/blog/` - Thumbnails de posts
- `public/images/podcast/` - Thumbnails de episódios
- `public/images/og-image.jpg` - Imagem Open Graph padrão

## 🎨 Customizar Design

### Cores e Tema

Edite `tailwind.config.js` e `src/styles/tokens.js`:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#6366f1', // Sua cor primária
        // ...
      }
    }
  }
}
```

### Fontes

Fontes são carregadas via Google Fonts no `index.html`. Para mudar:

```html
<!-- index.html -->
<link href="https://fonts.googleapis.com/css2?family=SuaFonte:wght@400;700&display=swap" rel="stylesheet" />
```

Depois atualize `tailwind.config.js`:

```js
fontFamily: {
  sans: ['SuaFonte', 'system-ui', 'sans-serif'],
}
```

## 🚀 Deploy na Vercel

### Passo 1: Prepare o Repositório

```bash
git add .
git commit -m "Setup inicial"
git push origin main
```

### Passo 2: Conecte à Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório GitHub
4. Configure as **variáveis de ambiente** (mesmo conteúdo do `.env.local`)

### Passo 3: Deploy

A Vercel detectará automaticamente o Vite e fará o deploy. A cada push, um novo deploy será criado.

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Executa ESLint
npm run format       # Formata código com Prettier
```

## 🧪 Testar Localmente

1. Crie uma conta de teste via `/cadastro`
2. Faça login com e-mail/senha ou Google
3. Navegue pelas rotas protegidas: `/diagnostico`, `/arquiteturas`, `/laboratorio`
4. Teste os players de áudio e vídeo
5. Verifique o banner de cookies e páginas legais

## 📱 PWA

A plataforma é configurada como PWA básico:
- Service worker via Vite PWA Plugin
- Manifest.json configurado
- Cache de assets críticos
- Funcionamento offline básico

Para testar PWA local:

```bash
npm run build
npm run preview
```

Abra no Chrome → DevTools → Application → Service Workers

## 🔒 Segurança e LGPD

✅ **Implementado:**
- Banner de cookies com "Rejeitar tudo"
- Páginas de políticas (Privacidade, Cookies, Termos)
- Consentimento granular
- Firebase Auth com regras básicas

⚠️ **Recomendações:**
- Configure regras de segurança no Firestore (Fase 2+)
- Adicione rate limiting em produção
- Revise políticas com advogado especializado em LGPD

## 🐛 Troubleshooting

### Firebase não conecta

- Verifique se o `.env.local` existe e tem as credenciais corretas
- Reinicie o servidor (`npm run dev`)
- Verifique se o domínio está em "Authorized domains" no Firebase

### Erros de build

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Componentes não aparecem

- Verifique imports (use aliases `@/`, `@components/`, etc.)
- Verifique se o Tailwind está funcionando (classes aplicadas?)

## 📚 Recursos e Documentação

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Firebase](https://firebase.google.com/docs)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contribuindo

Este é um projeto educacional. Para contribuir:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de uso educacional. Ajuste conforme necessário para uso comercial.

## ✉️ Contato

Para dúvidas ou sugestões:
- **E-mail**: [seu-email@example.com]
- **LinkedIn**: [Seu LinkedIn]
- **GitHub**: [@seu-usuario]

---

**Desenvolvido com ❤️ para a comunidade de LLMOps**





