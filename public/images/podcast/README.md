# 🎙️ Thumbnails dos Podcasts

Coloque aqui as imagens de capa dos episódios de podcast.

## 📁 Estrutura Esperada

```
public/images/podcast/
├── ep01.jpg
├── ep02.jpg
├── ep03.jpg
├── ep04.jpg
└── README.md
```

## 📏 Recomendações

- **Dimensões:** 1400x1400px (quadrado) ou 1920x1080px (16:9)
- **Formato:** JPG ou PNG
- **Peso:** Máximo 300KB
- **Estilo:** Consistente entre episódios

## 🔗 Como Vincular

No arquivo `src/data/podcastEpisodes.js`, use:

```javascript
thumbnail: '/images/podcast/ep01.jpg'
```

**Importante:** Sempre comece com `/` (barra)

