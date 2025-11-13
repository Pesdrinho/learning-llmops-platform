# 🎙️ Áudios dos Podcasts

Esta pasta contém os arquivos de áudio dos episódios do podcast.

## 📁 Estrutura

Coloque os arquivos de áudio aqui com os seguintes nomes:

```
public/audio/podcasts/
├── ep01.mp3
├── ep02.mp3
├── ep03.mp3
├── ep04.mp3
└── README.md (este arquivo)
```

## 🎵 Formatos Suportados

- **Recomendado:** MP3 (melhor compatibilidade com navegadores)
- **Alternativas:** OGG, WAV, M4A

## 📏 Recomendações de Tamanho

Para melhor performance:

- **Bitrate:** 128 kbps (qualidade boa) ou 64 kbps (tamanho menor)
- **Sample Rate:** 44.1 kHz ou 22.05 kHz
- **Mono vs Stereo:** Mono é suficiente para podcasts de voz

### Como Converter/Comprimir

Use ferramentas como:
- **FFmpeg** (linha de comando):
  ```bash
  ffmpeg -i input.mp3 -b:a 128k -ar 44100 output.mp3
  ```
- **Audacity** (GUI gratuito)
- **Adobe Audition** (profissional)

## 🔗 Como Vincular

Após adicionar o áudio aqui, atualize o arquivo:
`src/data/podcastEpisodes.js`

Exemplo:
```javascript
{
  slug: 'ep01-meu-episodio',
  // ... outros campos ...
  audioUrl: '/audio/podcasts/ep01.mp3',
}
```

## ⚠️ Importante

- **Não** commite arquivos muito grandes no Git
- Considere usar CDN ou serviço de hosting de áudio para arquivos grandes
- Para produção, recomenda-se:
  - **Cloudinary** (gratuito até 10GB)
  - **SoundCloud** (opção pública)
  - **AWS S3** (escalável)
  - **Firebase Storage** (já integrado na plataforma)

## 🚀 Alternativa: Usar Firebase Storage

Para arquivos grandes, você pode fazer upload para o Firebase Storage e usar a URL gerada:

```javascript
audioUrl: 'https://firebasestorage.googleapis.com/v0/b/seu-projeto/o/podcasts%2Fep01.mp3?alt=media',
```

## 📝 Metadata de Áudio

Adicione metadados ID3 nos arquivos MP3:
- **Título:** Nome do episódio
- **Artista:** Nome do podcast
- **Álbum:** "Learning LLMOps Podcast"
- **Artwork:** Thumbnail do episódio (300x300px mínimo)

Isso melhora a experiência em players de áudio nativos.




