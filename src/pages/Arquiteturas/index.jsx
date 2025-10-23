import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@/components/layout/Container';
import SEO from '@/components/SEO';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LISTA_ARQUITETURAS, filtrarArquiteturas } from '@/data/arquiteturas';
import {
  ArrowRight,
  GitCompare,
  Sparkles,
  DollarSign,
  BarChart3,
  Clock,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Arquiteturas() {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({});
  const [arquiteturasSelecionadas, setArquiteturasSelecionadas] = useState([]);

  const arquiteturasFiltradas = filtrarArquiteturas(filtros);

  const toggleSelecao = (id) => {
    setArquiteturasSelecionadas((prev) => {
      if (prev.includes(id)) {
        return prev.filter((arqId) => arqId !== id);
      } else if (prev.length < 2) {
        return [...prev, id];
      } else {
        // Substituir primeiro selecionado
        return [prev[1], id];
      }
    });
  };

  const handleComparar = () => {
    if (arquiteturasSelecionadas.length === 2) {
      navigate(
        `/arquiteturas/comparar?arq1=${arquiteturasSelecionadas[0]}&arq2=${arquiteturasSelecionadas[1]}`
      );
    }
  };

  const nivelIcons = {
    iniciante: '🟢',
    intermediario: '🟡',
    avancado: '🔴',
  };

  return (
    <>
      <SEO
        title="Galeria de Arquiteturas LLMOps"
        description="Explore arquiteturas de referência para sistemas LLMOps: RAG, Fine-tuning, Prompt Engineering e mais"
      />

      <Container className="py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Galeria de Arquiteturas LLMOps</h1>
            <p className="text-xl text-muted-foreground">
              Explore arquiteturas de referência interativas, compare padrões e exporte diagramas
              para sua documentação.
            </p>
          </div>

          {/* Filtros e Comparação */}
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select onValueChange={(value) => setFiltros({ ...filtros, nivel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iniciante">Iniciante</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="avancado">Avançado</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setFiltros({ ...filtros, custo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por custo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixo">Baixo</SelectItem>
                  <SelectItem value="medio">Médio</SelectItem>
                  <SelectItem value="alto">Alto</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setFiltros({ ...filtros, complexidade: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por complexidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {arquiteturasSelecionadas.length > 0 && (
              <Button
                onClick={handleComparar}
                disabled={arquiteturasSelecionadas.length !== 2}
                className="gap-2"
              >
                <GitCompare className="h-4 w-4" />
                Comparar ({arquiteturasSelecionadas.length}/2)
              </Button>
            )}
          </div>

          {/* Grid de Arquiteturas */}
          <div className="grid md:grid-cols-2 gap-6">
            {arquiteturasFiltradas.map((arq) => {
              const selecionada = arquiteturasSelecionadas.includes(arq.id);

              return (
                <Card
                  key={arq.id}
                  className={`transition-all hover:shadow-lg cursor-pointer ${
                    selecionada ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => toggleSelecao(arq.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          <span className="mr-2">{nivelIcons[arq.nivel]}</span>
                          {arq.nome}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {arq.descricao}
                        </CardDescription>
                      </div>
                      {selecionada && (
                        <Badge variant="default" className="flex-shrink-0">
                          Selecionada
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Métricas rápidas */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Nível:</span>
                        <span className="font-medium capitalize">{arq.nivel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Custo:</span>
                        <span className="font-medium capitalize">{arq.custoEstimado}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Complexidade:</span>
                        <span className="font-medium capitalize">{arq.complexidade}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Tempo:</span>
                        <span className="font-medium">{arq.tempoImplementacao}</span>
                      </div>
                    </div>

                    {/* Casos de uso */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Casos de uso:</p>
                      <ul className="space-y-1">
                        {arq.casosDeUso.slice(0, 2).map((caso, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span className="line-clamp-1">{caso}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Botão de detalhes */}
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/arquiteturas/${arq.id}`);
                      }}
                    >
                      Ver Detalhes <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Estado vazio */}
          {arquiteturasFiltradas.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">
                  Nenhuma arquitetura encontrada com os filtros selecionados.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setFiltros({})}
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </>
  );
}

