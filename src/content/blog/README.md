# 📝 Conteúdo do Blog

Este diretório contém os conteúdos dos posts do blog em formato Markdown, organizados em arquivos individuais para melhor modularidade e manutenibilidade.

## 📁 Estrutura

Cada post possui seu próprio arquivo JavaScript que exporta o conteúdo em Markdown:

```
src/content/blog/
├── niveis-organizacao-llmops.js
├── melhor-arquitetura-llmops.js
├── o-que-preciso-saber-llmops.js
├── arquiteturas-base-mlops.js
└── README.md (este arquivo)
```

## ✏️ Como Adicionar um Novo Post

### 1. Criar arquivo de conteúdo

Crie um novo arquivo em `src/content/blog/` com o nome do slug do post:

```javascript
// src/content/blog/novo-post.js
export const content = `
# Título do Post

Seu conteúdo em Markdown aqui...

## Seção 1

Texto...

## Seção 2

Mais texto...
`;
```

### 2. Adicionar metadados em blogPosts.js

Edite `src/data/blogPosts.js` e adicione:

```javascript
// No topo do arquivo, adicione o import
import { content as novoPostContent } from '@/content/blog/novo-post';

// No array blogPosts, adicione:
{
  slug: 'novo-post',
  title: 'Título do Post',
  summary: 'Resumo breve do post...',
  date: '2025-01-20',
  author: 'Pedro Ribeiro Fernandes',
  tags: ['tag1', 'tag2'],
  image: '/images/blog/novo-post.jpg',
  readingTime: '10 min de leitura',
  audiencia: {
    publicoAlvo: 'Público-alvo do post',
    objetivosAprendizado: [
      'Objetivo 1',
      'Objetivo 2',
    ],
    tempoEstimado: '10 min',
  },
  content: novoPostContent,
},
```

## 📝 Formatação Markdown Suportada

O componente `MarkdownContent` suporta:

### Cabeçalhos
```markdown
# H1
## H2
### H3
#### H4
```

### Ênfase
```markdown
**negrito**
*itálico*
***negrito e itálico***
```

### Listas
```markdown
- Item 1
- Item 2
  - Subitem 2.1

1. Item numerado 1
2. Item numerado 2
```

### Links
```markdown
[Texto do link](https://url.com)
[Link interno](/outra-pagina)
```

### Citações
```markdown
> Esta é uma citação
> que pode ter múltiplas linhas
```

### Código
```markdown
Código inline: `const x = 10;`

Bloco de código:
\`\`\`javascript
function exemplo() {
  return "Hello World";
}
\`\`\`
```

### Tabelas
```markdown
| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Dado 1   | Dado 2   | Dado 3   |
| Dado 4   | Dado 5   | Dado 6   |
```

### Separadores
```markdown
---
```

### Elementos Visuais Especiais

#### Emojis
Use emojis diretamente no texto para melhorar a escaneabilidade:
```markdown
🎯 Objetivo
📊 Dados
✅ Sucesso
⚠️ Atenção
💡 Dica
```

#### Callouts (via blockquote com formato especial)
```markdown
> **💡 Dica**
>
> Conteúdo da dica aqui
```

## 🎨 Boas Práticas de Formatação

1. **Use cabeçalhos hierarquicamente**: H1 → H2 → H3 (não pule níveis)
2. **Adicione emojis contextuais**: Melhora a experiência visual
3. **Use tabelas para comparações**: Facilita a compreensão
4. **Destaque informações importantes**: Use negrito e citações
5. **Quebre texto em seções**: Facilita a leitura
6. **Adicione espaçamento**: Use `---` para separar seções grandes

## 🔧 Componentes Disponíveis

Além do Markdown padrão, você pode usar componentes React no conteúdo (em desenvolvimento):

- `Callout`: Caixas de destaque para informações importantes
- `CodeBlock`: Blocos de código com syntax highlighting
- `Steps`: Lista de passos numerados
- `TableOfContents`: Índice automático

## 🚀 Próximos Passos

Para melhorar ainda mais o sistema de conteúdo:

1. [ ] Adicionar syntax highlighting para código
2. [ ] Implementar geração automática de TOC (Table of Contents)
3. [ ] Adicionar suporte a componentes React dentro do Markdown
4. [ ] Criar sistema de tags e categorias
5. [ ] Implementar busca full-text nos posts




