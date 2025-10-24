# Imagens da Plataforma

Esta pasta contém todas as imagens públicas da plataforma.

## Estrutura Recomendada

```
images/
├── blog/              # Thumbnails de posts do blog
├── podcast/           # Thumbnails de episódios
├── guia/              # Imagens das macro-etapas
├── og-image.jpg       # Imagem padrão Open Graph (1200x630px)
└── placeholder.jpg    # Imagem placeholder genérica
```

## Diretrizes de Imagens

### Thumbnails de Blog

- **Dimensões**: 1200x630px (proporção 1.91:1)
- **Formato**: JPG ou PNG
- **Tamanho**: < 200KB
- **Nomes**: Use slugs descritivos (ex: `introducao-llmops.jpg`)

### Thumbnails de Podcast

- **Dimensões**: 1:1 quadrado (recomendado 1400x1400px)
- **Formato**: JPG ou PNG
- **Tamanho**: < 300KB
- **Inclua**: Número do episódio, título resumido

### Open Graph (og-image.jpg)

- **Dimensões**: 1200x630px
- **Formato**: JPG
- **Conteúdo**: Logo + tagline da plataforma
- **Usada**: Quando compartilhar links em redes sociais

## Fontes de Imagens Gratuitas

- [Unsplash](https://unsplash.com/) - Fotos de alta qualidade
- [Pexels](https://www.pexels.com/) - Fotos e vídeos gratuitos
- [Pixabay](https://pixabay.com/) - Imagens e vetores
- [Illustrations](https://undraw.co/) - Ilustrações customizáveis

## Otimização

Sempre otimize imagens antes de usar:

```bash
# Com ImageMagick
convert input.jpg -quality 85 -strip output.jpg

# Online
https://tinypng.com/
https://squoosh.app/
```

## Placeholders Temporários

Durante desenvolvimento, use:
- [Placeholder.com](https://placeholder.com/1200x630)
- [Lorem Picsum](https://picsum.photos/1200/630)
- [Unsplash Random](https://source.unsplash.com/1200x630/?tech)

Exemplo de uso temporário:
```jsx
<img src="https://picsum.photos/1200/630" alt="Placeholder" />
```





