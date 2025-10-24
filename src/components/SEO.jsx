import { Helmet } from 'react-helmet-async';

/**
 * Componente SEO para metadados dinâmicos
 * Usa React Helmet Async para gerenciar tags <head>
 */
export default function SEO({
  title,
  description = 'Plataforma interativa para aprendizado e implementação de sistemas LLMOps',
  image = '/images/og-image.jpg',
  url = '',
  type = 'website',
  author = 'Learning LLMOps Platform',
  keywords = 'llmops, machine learning, ai, arquitetura, rag, fine-tuning',
}) {
  const siteTitle = 'Learning LLMOps Platform';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const canonicalUrl = url ? `https://seudominio.com${url}` : 'https://seudominio.com';

  return (
    <Helmet>
      {/* Metadados básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          name: fullTitle,
          description: description,
          url: canonicalUrl,
          image: image,
          author: {
            '@type': 'Organization',
            name: author,
          },
        })}
      </script>
    </Helmet>
  );
}





