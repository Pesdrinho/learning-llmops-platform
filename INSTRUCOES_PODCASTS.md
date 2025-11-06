# 🎙️ Instruções para Adicionar seus Podcasts

## 📋 Checklist Rápido

- [ ] Preparar áudios (MP3, 128kbps recomendado)
- [ ] Colocar áudios na pasta `public/audio/podcasts/`
- [ ] Preencher metadados em `src/data/podcastEpisodes.js`
- [ ] (Opcional) Adicionar thumbnails em `public/images/podcast/`

---

## 1️⃣ Preparar os Arquivos de Áudio

### Formato Recomendado
- **Formato:** MP3
- **Bitrate:** 128 kbps (qualidade boa) ou 64 kbps (arquivo menor)
- **Sample Rate:** 44.1 kHz
- **Canais:** Mono (suficiente para voz)

### Como Converter/Comprimir

#### Opção 1: FFmpeg (Linha de Comando)
```bash
ffmpeg -i seu-audio-original.mp3 -b:a 128k -ar 44100 -ac 1 ep01.mp3
```

#### Opção 2: Audacity (Interface Gráfica - Gratuito)
1. Abra o áudio no Audacity
2. `Arquivo` → `Exportar` → `Exportar como MP3`
3. Qualidade: 128 kbps
4. Salvar

### Nomear os Arquivos
```
ep01.mp3
ep02.mp3
ep03.mp3
ep04.mp3
```

---

## 2️⃣ Adicionar Áudios ao Projeto

Coloque os arquivos MP3 na pasta:
```
public/audio/podcasts/
```

Estrutura final:
```
public/
└── audio/
    └── podcasts/
        ├── ep01.mp3
        ├── ep02.mp3
        ├── ep03.mp3
        ├── ep04.mp3
        └── README.md
```

---

## 3️⃣ Preencher os Metadados

Edite o arquivo: `src/data/podcastEpisodes.js`

### Estrutura de um Episódio

```javascript
{
  slug: 'ep01-titulo-do-episodio',  // URL amigável (sem espaços, use hífens)
  numero: 1,  // Número do episódio
  titulo: 'Título Completo do Episódio',
  descricao: 'Descrição detalhada que aparecerá na lista de episódios.',
  data: '2025-01-20',  // Formato: AAAA-MM-DD
  duracao: '45:30',  // Formato: MM:SS ou HH:MM:SS
  temas: ['tema1', 'tema2', 'tema3'],  // Tags do episódio
  convidado: {
    nome: 'Nome do Convidado',
    cargo: 'Cargo do Convidado',
    empresa: 'Empresa',
    linkedin: 'https://linkedin.com/in/usuario',  // Pode ser null
  },
  audioUrl: '/audio/podcasts/ep01.mp3',  // ⚠️ IMPORTANTE: Caminho do áudio
  thumbnail: '/images/podcast/ep01.jpg',  // Opcional (pode deixar como está)
  audiencia: {
    publicoAlvo: 'Para quem é este episódio',
    objetivosAprendizado: [
      'O que o ouvinte vai aprender 1',
      'O que o ouvinte vai aprender 2',
    ],
    tempoEstimado: '45 min',
  },
  notas: [  // Timestamps do episódio
    {
      tempo: '00:00',
      descricao: 'Introdução',
    },
    {
      tempo: '05:30',
      descricao: 'Primeiro tópico',
    },
    // ... adicione mais timestamps
  ],
  recursosRelacionados: [  // Links para posts do blog ou guias relacionados
    {
      titulo: 'Post Relacionado',
      link: '/blog/post-slug',
      tipo: 'Post',
    },
  ],
}
```

---

## 4️⃣ Exemplo Completo de Episódio

```javascript
{
  slug: 'ep01-introducao-llmops',
  numero: 1,
  titulo: 'Introdução ao LLMOps: Fundamentos e Conceitos',
  descricao: 'Neste primeiro episódio, exploramos os conceitos fundamentais de LLMOps, discutindo o que diferencia essa prática do MLOps tradicional e por que ela é essencial para sistemas de IA modernos.',
  data: '2025-01-15',
  duracao: '42:30',
  temas: ['fundamentos', 'llmops', 'introdução'],
  convidado: {
    nome: 'João Silva',
    cargo: 'ML Engineer',
    empresa: 'TechCorp',
    linkedin: 'https://linkedin.com/in/joaosilva',
  },
  audioUrl: '/audio/podcasts/ep01.mp3',
  thumbnail: '/images/podcast/ep01.jpg',
  audiencia: {
    publicoAlvo: 'Profissionais de ML e desenvolvedores iniciando em LLMOps',
    objetivosAprendizado: [
      'Entender o que é LLMOps',
      'Compreender as diferenças para MLOps tradicional',
      'Conhecer os principais desafios',
    ],
    tempoEstimado: '43 min',
  },
  notas: [
    { tempo: '00:00', descricao: 'Abertura e apresentação' },
    { tempo: '03:15', descricao: 'O que é LLMOps?' },
    { tempo: '12:30', descricao: 'MLOps vs LLMOps' },
    { tempo: '25:00', descricao: 'Desafios em produção' },
    { tempo: '38:00', descricao: 'Perguntas e encerramento' },
  ],
  recursosRelacionados: [
    {
      titulo: 'Guia Introdutório de Arquiteturas em LLMOps',
      link: '/blog/melhor-arquitetura-llmops',
      tipo: 'Post',
    },
  ],
},
```

---

## 5️⃣ (Opcional) Adicionar Thumbnails

Se quiser adicionar imagens de capa para os episódios:

1. Crie imagens 1200x675px (16:9) ou 1000x1000px (quadrado)
2. Salve como JPG em: `public/images/podcast/`
3. Nomeie como: `ep01.jpg`, `ep02.jpg`, etc.
4. Atualize o campo `thumbnail` no episódio

---

## 6️⃣ Testar

Após adicionar:

1. Execute o projeto: `npm run dev`
2. Acesse: `http://localhost:5173/podcast`
3. Clique em um episódio para testar o player

---

## ⚠️ Notas Importantes

### Tamanho dos Arquivos
- **Para desenvolvimento local:** Qualquer tamanho funciona
- **Para produção:** Considere hospedar os áudios externamente:
  - **Firebase Storage** (já configurado no projeto)
  - **Cloudinary** (até 10GB grátis)
  - **SoundCloud**
  - **AWS S3**

### Se usar Hospedagem Externa

Se hospedar os áudios em outro lugar, apenas atualize a URL:

```javascript
audioUrl: 'https://firebasestorage.googleapis.com/.../ep01.mp3',
```

### Metadados ID3 (Opcional mas Recomendado)

Adicione informações aos MP3 para melhorar a experiência:

```
Título: Nome do Episódio
Artista: Learning LLMOps Podcast
Álbum: Learning LLMOps
Artwork: Capa 300x300px
```

Use ferramentas como **Mp3tag** (Windows) ou **Kid3** (Mac/Linux).

---

## 🆘 Precisa de Ajuda?

### Erros Comuns

**1. Áudio não toca**
- Verifique se o caminho em `audioUrl` está correto
- Confirme que o arquivo está em `public/audio/podcasts/`
- Teste o áudio em outro player primeiro

**2. Episódio não aparece**
- Verifique se adicionou a vírgula após o episódio anterior no array
- Confirme que todos os campos obrigatórios estão preenchidos
- Veja o console do navegador (F12) por erros

**3. Formato de data inválido**
- Use sempre: `AAAA-MM-DD` (ex: `2025-01-15`)

---

## ✅ Pronto!

Após seguir todos os passos, seus podcasts estarão funcionando perfeitamente na plataforma!

**Dúvidas?** Qualquer problema, me avise!




