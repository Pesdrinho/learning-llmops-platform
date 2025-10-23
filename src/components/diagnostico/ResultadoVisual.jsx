import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { exportarRelatorioPDF } from '@/lib/pdf/diagnosticoExport';
import { useState } from 'react';

export default function ResultadoVisual({ diagnostico }) {
  const [exportando, setExportando] = useState(false);
  const { scores, recomendacoes } = diagnostico;

  // Prepara dados para o radar chart
  const dadosRadar = Object.entries(scores.porEtapa).map(([etapa, score]) => {
    const nomesEtapas = {
      descoberta: 'Descoberta',
      dados: 'Dados',
      arquitetura: 'Arquitetura',
      implementacao: 'Implementação',
      avaliacao: 'Avaliação',
      deploy: 'Deploy',
      governanca: 'Governança',
    };

    return {
      etapa: nomesEtapas[etapa] || etapa,
      score: parseFloat(score.toFixed(1)),
    };
  });

  // Prepara dados para o bar chart
  const dadosBar = Object.entries(scores.porNivel).map(([nivel, score]) => ({
    nivel,
    score: parseFloat(score.toFixed(1)),
  }));

  const handleExportPDF = async () => {
    setExportando(true);
    try {
      await exportarRelatorioPDF(diagnostico);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    } finally {
      setExportando(false);
    }
  };

  return (
    <div className="space-y-8" id="charts-container">
      {/* Score Geral */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Score Geral de Maturidade</p>
            <p className="text-6xl font-bold text-primary">{scores.geral.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">em uma escala de 0 a 10</p>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart - Maturidade por Etapa */}
      <Card>
        <CardHeader>
          <CardTitle>Maturidade por Macro-Etapa</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={dadosRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="etapa" />
              <PolarRadiusAxis angle={90} domain={[0, 10]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart - Níveis Organizacionais */}
      <Card>
        <CardHeader>
          <CardTitle>Níveis Organizacionais (L1-L12)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosBar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nivel" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="hsl(var(--primary))" name="Score" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Arquiteturas Recomendadas */}
      <Card>
        <CardHeader>
          <CardTitle>Arquiteturas Recomendadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recomendacoes.arquiteturas?.length > 0 ? (
              recomendacoes.arquiteturas.map((arq, idx) => (
                <div
                  key={arq.id}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold">{arq.nome}</h4>
                    <p className="text-sm text-muted-foreground">{arq.motivo}</p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`/arquiteturas/${arq.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">Nenhuma arquitetura específica recomendada.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Próximos Passos */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recomendacoes.proximosPassos?.map((passo, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{passo.titulo}</h4>
                    <Badge variant={passo.prioridade === 'alta' ? 'destructive' : 'secondary'}>
                      {passo.prioridade}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{passo.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Riscos e Alertas */}
      {recomendacoes.riscos?.length > 0 && (
        <Card className="border-orange-200 dark:border-orange-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Riscos e Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recomendacoes.riscos.map((risco, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-orange-900 dark:text-orange-100">
                        {risco.titulo}
                      </h4>
                      <Badge
                        variant={risco.nivel === 'alto' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {risco.nivel}
                      </Badge>
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      {risco.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botão de Export */}
      <div className="flex justify-center">
        <Button onClick={handleExportPDF} disabled={exportando} size="lg" className="gap-2">
          <Download className="h-5 w-5" />
          {exportando ? 'Gerando PDF...' : 'Exportar Relatório (PDF)'}
        </Button>
      </div>
    </div>
  );
}

