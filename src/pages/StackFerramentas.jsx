import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import ExternalContentSection from '@components/ExternalContentSection';
import { getTodasEtapasStack } from '@data/stackFerramentas';
import { ExternalLink, Wrench, Filter } from 'lucide-react';

/**
 * Página de Stack de Ferramentas organizadas por macro-etapas
 */
export default function StackFerramentas() {
  const etapas = getTodasEtapasStack();
  const [filtroCategoria, setFiltroCategoria] = useState('todas');

  const categorias = [
    { value: 'todas', label: 'Todas' },
    { value: 'open-source', label: 'Open Source' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'híbrido', label: 'Híbrido' },
  ];

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case 'open-source':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'comercial':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'híbrido':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return '';
    }
  };

  return (
    <>
      <SEO
        title="Stack de Ferramentas LLMOps"
        description="Ferramentas essenciais organizadas por macro-etapas do ciclo de vida LLMOps"
        type="website"
      />

      {/* Header */}
      <div className="border-b bg-muted/30">
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Wrench className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold">Stack de Ferramentas LLMOps</h1>
            <p className="text-lg text-muted-foreground">
              Ferramentas essenciais organizadas por macro-etapas do ciclo de vida LLMOps,
              desde definição de requisitos até automação de operações
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Filtro de Categoria */}
        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4" />
            Filtrar por:
          </div>
          <div className="flex gap-2">
            {categorias.map((cat) => (
              <Button
                key={cat.value}
                size="sm"
                variant={filtroCategoria === cat.value ? 'default' : 'outline'}
                onClick={() => setFiltroCategoria(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Etapas e Ferramentas */}
        <div className="space-y-12">
          {etapas.map((etapa) => {
            // Filtra ferramentas por categoria
            const ferramentasFiltradas =
              filtroCategoria === 'todas'
                ? etapa.ferramentas
                : etapa.ferramentas.filter((f) => f.categoria === filtroCategoria);

            // Não mostra etapa se não houver ferramentas filtradas
            if (ferramentasFiltradas.length === 0) return null;

            return (
              <section key={etapa.slug}>
                {/* Header da Etapa */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {etapa.numero}
                    </div>
                    <h2 className="text-3xl font-bold">{etapa.titulo}</h2>
                  </div>
                  <p className="text-muted-foreground ml-13">{etapa.descricao}</p>
                </div>

                {/* Grid de Ferramentas */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {ferramentasFiltradas.map((ferramenta) => (
                    <Card key={ferramenta.nome} className="transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <CardTitle className="text-lg">{ferramenta.nome}</CardTitle>
                          <Badge className={getCategoriaColor(ferramenta.categoria)}>
                            {ferramenta.categoria}
                          </Badge>
                        </div>
                        <CardDescription>{ferramenta.descricao}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {ferramenta.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Link */}
                        {ferramenta.link && (
                          <Button asChild size="sm" variant="ghost" className="w-full">
                            <a
                              href={ferramenta.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              Acessar site oficial
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Conteúdos Externos da Etapa */}
                {etapa.conteudosExternos && etapa.conteudosExternos.length > 0 && (
                  <div className="mt-8">
                    <ExternalContentSection 
                      contents={etapa.conteudosExternos}
                      title="Aprenda Mais"
                    />
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Legenda de Categorias */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Sobre as Categorias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className={getCategoriaColor('open-source')}>Open Source</Badge>
              <p className="text-sm text-muted-foreground flex-1">
                Ferramentas de código aberto, gratuitas e com comunidade ativa
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge className={getCategoriaColor('comercial')}>Comercial</Badge>
              <p className="text-sm text-muted-foreground flex-1">
                Soluções comerciais pagas, geralmente com suporte empresarial
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge className={getCategoriaColor('híbrido')}>Híbrido</Badge>
              <p className="text-sm text-muted-foreground flex-1">
                Ferramentas com versões gratuitas e pagas, ou open-source com opções comerciais
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-subtle border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Quer aprender a usar essas ferramentas?</h3>
              <p className="text-muted-foreground">
                Explore nosso guia de macro-etapas para entender quando e como aplicar cada ferramenta
                no seu projeto LLMOps
              </p>
              <Button asChild>
                <a href="/guia">Explorar Guia de Macro-etapas</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}


