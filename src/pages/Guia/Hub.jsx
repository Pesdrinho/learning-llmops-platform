import { useState, useMemo } from 'react';
import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import SearchBar from '@components/SearchBar';
import GuideFilters from '@components/GuideFilters';
import GuideCard from '@components/GuideCard';
import { BookOpen, Sparkles } from 'lucide-react';
import { getTodasGuias, getCategorias, getNiveis } from '@data/guiasCatalogo';
import Fuse from 'fuse.js';

/**
 * Hub de Guias - Página principal com busca e filtros
 */
export default function Hub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const todasGuias = getTodasGuias();
  const categorias = getCategorias();
  const niveis = getNiveis();

  // Configuração do Fuse.js para busca fuzzy
  const fuse = useMemo(() => {
    return new Fuse(todasGuias, {
      keys: ['titulo', 'descricao', 'subtitulo', 'tags', 'categoria'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [todasGuias]);

  // Aplicar busca e filtros
  const guiasFiltrados = useMemo(() => {
    let resultado = todasGuias;

    // Aplicar busca
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      resultado = searchResults.map((result) => result.item);
    }

    // Aplicar filtros
    if (filters.categoria) {
      resultado = resultado.filter((guia) => guia.categoria === filters.categoria);
    }
    if (filters.nivel) {
      resultado = resultado.filter((guia) => guia.nivel === filters.nivel);
    }
    if (filters.status) {
      resultado = resultado.filter((guia) => guia.status === filters.status);
    }

    return resultado;
  }, [searchTerm, filters, todasGuias, fuse]);

  const guiasCompletos = guiasFiltrados.filter((g) => g.status === 'completo');
  const guiasEmDesenvolvimento = guiasFiltrados.filter((g) => g.status !== 'completo');

  return (
    <>
      <SEO
        title="Hub de Guias - Learning LLMOps"
        description="Explore guias práticos para LLMOps, RAG, MLOps, Data Engineering e mais"
        type="website"
      />

      {/* Header */}
      <div className="border-b bg-muted/30">
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <Badge className="mb-4">Hub de Conhecimento</Badge>
            <h1 className="text-4xl font-bold">Guias Práticos</h1>
            <p className="text-lg text-muted-foreground">
              Explore guias estruturados com perguntas práticas e caminhos claros para implementar
              sistemas de IA em produção
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Explicação do Hub */}
        <Card className="mb-8 border-primary/20 bg-gradient-subtle">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">O que são os Guias?</h3>
                <p className="text-sm text-muted-foreground">
                  Os guias fornecem um <strong>caminho prático e estruturado</strong> para cada etapa
                  do desenvolvimento de sistemas do tema apresentado. Cada guia contém{' '}
                  <strong>perguntas relevantes a serem respondidas</strong>, decisões arquiteturais,
                  ferramentas recomendadas e materiais complementares para aprofundamento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar de Filtros */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <GuideFilters
                filters={filters}
                onFilterChange={setFilters}
                categorias={categorias}
                niveis={niveis}
              />
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3 space-y-8">
            {/* Busca */}
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar por título, descrição, tags..."
            />

            {/* Resultados */}
            <div className="space-y-8">
              {/* Guias Completos */}
              {guiasCompletos.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Guias Disponíveis
                    <Badge variant="secondary" className="ml-2">
                      {guiasCompletos.length}
                    </Badge>
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {guiasCompletos.map((guia) => (
                      <GuideCard key={guia.id} guia={guia} />
                    ))}
                  </div>
                </section>
              )}

              {/* Guias em Desenvolvimento */}
              {guiasEmDesenvolvimento.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Em Desenvolvimento
                    <Badge variant="outline" className="ml-2">
                      {guiasEmDesenvolvimento.length}
                    </Badge>
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {guiasEmDesenvolvimento.map((guia) => (
                      <GuideCard key={guia.id} guia={guia} />
                    ))}
                  </div>
                </section>
              )}

              {/* Sem resultados */}
              {guiasFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhum guia encontrado com os filtros selecionados.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

